import { connectToDatabase } from '@/lib/mongoose';
import Token from '@/model/model';
import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

export async function GET(request: NextRequest) {
  await connectToDatabase();
  
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  if (!code) {
    return NextResponse.json({ error: 'Código de autorização não fornecido' }, { status: 400 });
  }

  if (!state) {
    return NextResponse.json({ error: 'String de segurança não fornecido' }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  try {
    const tokenResponse = await fetch('https://auth.contaazul.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json({ error: 'Erro ao obter token', details: errorData }, { status: 500 });
    }

    const tokenData = await tokenResponse.json();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + tokenData.expires_in * 1000);
    const tokenDoc = {
      id_token: tokenData.id_token,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: expiresAt,
      token_type: tokenData.token_type,
      created_at: now,
      updated_at: now,
    };
    await Token.create(tokenDoc);

    return NextResponse.json({ token: tokenData });
  } catch (error) {
    return NextResponse.json({ error: 'Erro inesperado', details: String(error) }, { status: 500 });
  }
}
