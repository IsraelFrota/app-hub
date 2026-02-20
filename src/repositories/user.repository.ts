import {
  connectToDatabase,
  connectToDatabaseV2,
} from "@/lib/mongoose";
import { tokenSchema, userSchema } from "@/models/user.model";


export async function getTokenRepository() {
  const conn = await connectToDatabase();
  return conn.models.Token || conn.model("Token", tokenSchema);
}

export async function getUserRepository() {
  const conn = await connectToDatabaseV2();
  return conn.models.User || conn.model("User", userSchema);
}
