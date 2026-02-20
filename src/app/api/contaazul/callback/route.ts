import { NextRequest, NextResponse } from 'next/server';
import { handleOAuthCallback } from '@/services/contaazul.service';


export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');

  if (!code) {
    return NextResponse.json(
      { error: 'Código de autorização não fornecido' }, 
      { status: 400 }
    );
  }
  if (!state) {
    return NextResponse.json(
      { error: 'String de segurança não fornecido' }, 
      { status: 400 }
    );
  }

  const token = await handleOAuthCallback(code);
  if (token === null) {
    return NextResponse.json(
      { error: "Erro ao obter token do ContaAzul" }, 
      { status: 500 }
    );
  }

  return NextResponse.json(
    { token }, 
    { status: 200 }
  );
}
