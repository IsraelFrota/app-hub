import { Types } from 'mongoose';
import { Suggestion } from '@/lib/models/suggestion';
import {
  incrementVote,
	listSuggestions,
  createSuggestion,
} from '@/repositories/suggestion.repository';

export async function createSuggestionService(
  data: Omit<Suggestion, '_id' | 'comments' | 'date'>
) {
  const suggestion = {
    _id: new Types.ObjectId(),
    name: data.name || 'Anônimo',
    date: new Date(),
    comments: [],
    ...data,
  };
  return createSuggestion(suggestion);
}

export async function getSuggestionsService() {
  return listSuggestions();
}

export async function voteSuggestionService(id: string) {
  const result = await incrementVote(id);
  if (result.matchedCount === 0) {
    throw new Error('NOT_FOUND');
  }
}