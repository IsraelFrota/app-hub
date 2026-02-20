import {
  connectToDatabase,
  connectToDatabaseV2,
} from "@/lib/mongoose";
import { suggestionSchema } from "@/models/suggestion.model";


export async function getSuggestionRepository() {
  const conn = await connectToDatabaseV2();
  return conn.models.Suggestion || conn.model("Suggestion", suggestionSchema);
}
