import { Types } from 'mongoose';
import { addCommentToSuggestion } from '@/repositories/suggestion.repository';

export async function createCommentService(
  suggestionId: string,
  author: string | undefined,
  text: string
) {
  const comment = {
    _id: new Types.ObjectId(),
    author: author || 'Anônimo',
    text,
    date: new Date(),
  };
  const result = await addCommentToSuggestion(suggestionId, comment);
  if (result.matchedCount === 0) {
    throw new Error('NOT_FOUND');
  }
  return comment;
}