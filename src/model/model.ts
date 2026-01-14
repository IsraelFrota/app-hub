import { Schema, model, models }  from 'mongoose';
import {
  connectToDatabase,
  connectToDatabaseV2,
} from "@/lib/mongoose";

const tokenSchema = new Schema({
  "id_token": String,
  "access_token": String,
  "refresh_token": String,
  "expires_at": Number,
	"token_type": String,
  "created_at": Date,
  "updated_at": Date
});

const suggestionSchema = new Schema({
  "name": String,
  "suggestion": String,
  "date": Date,
  "type": String,
  "vote": Number,
});

export async function getSuggestionModel() {
  const conn = await connectToDatabaseV2();
  return conn.models.Suggestion || conn.model("Suggestion", suggestionSchema);
}

export async function getTokenModel() {
  const conn = await connectToDatabase();
  return conn.models.Token || conn.model("Token", tokenSchema);
}