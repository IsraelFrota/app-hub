import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { createCommentService } from '@/services/comment.service';

export async function POST(
  request: NextRequest
) {
  try {
    const { suggestionId, author, text } = await request.json();

    if (!suggestionId || !text) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      );
    }

    const comment = await createCommentService(
        suggestionId,
        author,
        text
      );

    return NextResponse.json(
      { message: 'Comentário salvo com sucesso.', comment },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'NOT_FOUND'
    ) {
      return NextResponse.json(
        { error: 'Suggestion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}