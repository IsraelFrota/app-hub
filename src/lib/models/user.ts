import {
	Types,
	Schema,
} from 'mongoose';
import { getModel } from './factory';

export interface User {
  _id: Types.ObjectId;
  email: string;
  password: string;
};

const userSchema =
  new Schema<User>({
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

export function getUserModel() {
  return getModel(
    'SUGGESTION',
    process.env.MONGODB_URI_SUGGESTION,
    'User',
    userSchema
  );
}