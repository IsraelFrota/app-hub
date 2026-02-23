import { Schema } from 'mongoose';
import { getModel } from './factory';

export interface Token {
  id_token?: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
  created_at?: Date;
  updated_at?: Date;
};

const tokenSchema =
  new Schema<Token>({
    id_token: String,
    access_token: String,
    refresh_token: String,
    expires_at: Number,
    token_type: String,
    created_at: Date,
    updated_at: Date,
  });

export function getTokenModel() {
  return getModel(
    'CONTA_AZUL',
    process.env.MONGODB_URI_CONTAAZUL,
    'Token',
    tokenSchema
  );
}