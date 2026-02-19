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
  name: {
    type: String,
  },
    text: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["suggestion", "feedback"],
    required: true,
  },
  vote: {
    type: Number,
    default: 0,
    min: 0,
  },
  comments: {
    type: [commentSchema],
    default: []
  }
});

const userSchema = new Schema({
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

export async function getSuggestionModel() {
  const conn = await connectToDatabaseV2();
  return conn.models.Suggestion || conn.model("Suggestion", suggestionSchema);
}

export async function getTokenModel() {
  const conn = await connectToDatabase();
  return conn.models.Token || conn.model("Token", tokenSchema);
}

export async function getUserModel() {
  const conn = await connectToDatabaseV2();
  return conn.models.User || conn.model("User", userSchema);
}