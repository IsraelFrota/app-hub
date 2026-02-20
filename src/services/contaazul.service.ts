import { connectToDatabase } from '@/lib/mongoose';
import { getTokenRepository } from '@/repositories/user.repository';


const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;


export async function handleOAuthCallback(code: string) {
  await connectToDatabase();

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  const tokenResponse = await fetch('https://auth.contaazul.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`,
    },
    body: params.toString(),
  });

  if (!tokenResponse.ok) return null;

  const tokenData = await tokenResponse.json();
  const now = new Date();

  const Token = await getTokenRepository();
  await Token.create({
      id_token: tokenData.id_token,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: new Date(now.getTime() + tokenData.expires_in * 1000),
      token_type: tokenData.token_type,
      created_at: now,
      updated_at: now,
  });

  return tokenData;
}
