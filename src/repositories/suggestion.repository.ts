import {
  Comment,
  Suggestion,
  getSuggestionModel,
} from '@/lib/models/suggestion';

type ListSuggestionsOptions = {
  publicOnly?: boolean;
};

export async function createSuggestion(data: Suggestion) {
  const SuggestionModel = await getSuggestionModel();
  return SuggestionModel.create(data);
}

export async function listSuggestions(
  options?: ListSuggestionsOptions
) {
  const SuggestionModel = await getSuggestionModel();
  const query = options?.publicOnly
    ? { type: 'suggestion' }
    : {};
  return SuggestionModel.find(query).lean();
}

export async function incrementVote(id: string) {
  const SuggestionModel = await getSuggestionModel();
  return SuggestionModel.updateOne(
    { _id: id },
    { $inc: { vote: 1 } }
  );
}

export async function addCommentToSuggestion(
  suggestionId: string,
  comment: Comment,
) {
  const suggestion = await getSuggestionModel();
  return suggestion.updateOne(
    { _id: suggestionId },
    {
      $push: {
        comments: comment,
      },
    },
  );
}