import { Schema, Types }  from 'mongoose';
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

const commentSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    author: {
      type: String,
      default: "Anônimo",
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const suggestionSchema = new Schema({
  "name": String,
  "suggestion": String,
  "date": Date,
  "type": String,
  "vote": Number,
  "comments": {
    type: [commentSchema],
    default: []
  }
});

export async function getSuggestionModel() {
  const conn = await connectToDatabaseV2();
  return conn.models.Suggestion || conn.model("Suggestion", suggestionSchema);
}

export async function getTokenModel() {
  const conn = await connectToDatabase();
  return conn.models.Token || conn.model("Token", tokenSchema);
}