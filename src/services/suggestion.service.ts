import { Types } from "mongoose";
import { connectToDatabaseV2 } from "@/lib/mongoose";
import { getSuggestionRepository } from "@/repositories/suggestion.repository";
import { suggestionSchema } from "@/schemas/suggestion.schema";


/* 
    SUGGESTION
*/
export async function getSuggestions() {
    await connectToDatabaseV2();
    const Suggestion = await getSuggestionRepository();

    return Suggestion
                .find()
                .lean();
}

export async function createSuggestion(data: unknown) {
    await connectToDatabaseV2();

    const parsed = suggestionSchema.safeParse(data);
    if (!parsed.success) 
        return null;

    const Suggestion = await getSuggestionRepository();
    await Suggestion.create(data);

    return true;
}

/* 
    COMMENTS
*/
export async function addComment(suggestionId: string, author: string, text: string) {
    await connectToDatabaseV2();

    const Suggestion = await getSuggestionRepository();
    const comment = {
        _id: new Types.ObjectId(),
        author: author || "Anônimo",
        text,
        date: new Date(),
    };
    await Suggestion.updateOne(
        { _id: suggestionId },
        {
            $push: {
                comments: comment,
            },
        }
    );

    return comment;
}

/* 
    VOTE IN SUGGESTION
*/
export async function addVote (id: string) {
    await connectToDatabaseV2();

    const Suggestion = await getSuggestionRepository();
    const result = await Suggestion.updateOne(
        { _id: id },
        { $inc: { vote: 1 } }
    );

    return result.matchedCount > 0;
} 
