import { NextResponse } from 'next/server';
import crypto from 'crypto';

const CLIENT_ID = process.env.CLIENT_ID!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

export async function GET() {
  const state = crypto.randomUUID();

  const authUrl =
    `https://auth.contaazul.com/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=openid+profile+aws.cognito.signin.user.admin` +
    `&state=${state}`;

  const response = NextResponse.json({ url: authUrl });

  response.cookies.set('contaazul_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  return response;
}