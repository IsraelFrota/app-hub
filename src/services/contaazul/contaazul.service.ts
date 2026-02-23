import { requestContaAzulToken } from './contaazul.client';
import { createToken } from '@/repositories/token.repository';

export async function handleContaAzulCallback(
  code: string
) {
  const tokenData = await requestContaAzulToken(code);

  const now = new Date();

  const expiresAt = new Date(
    now.getTime() + tokenData.expires_in * 1000
  ).getTime();

  const tokenDoc = {
    id_token: tokenData.id_token,
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_at: expiresAt,
    token_type: tokenData.token_type,
    created_at: now,
    updated_at: now,
  };

  await createToken(tokenDoc);

  return tokenData;
}