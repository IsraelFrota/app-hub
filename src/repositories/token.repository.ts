import { Token, getTokenModel } from '@/lib/models/token';

export async function createToken(
  token: Token
) {
  const Token = await getTokenModel();
  return Token.create(token);
}