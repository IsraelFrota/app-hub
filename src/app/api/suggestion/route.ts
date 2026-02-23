import {
  NextRequest,
  NextResponse,
} from 'next/server';
import {
	getSuggestionsService,
	voteSuggestionService,
	createSuggestionService,
} from '@/services/suggestion.service';
import { suggestionSchema } from '@/lib/schemas/suggestion.schema';

export async function POST(
	request: NextRequest
) {
  try {
    const body = await request.json();

    const parsed = suggestionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      );
    }

    await createSuggestionService(parsed.data);

    return NextResponse.json(
      { message: 'Created' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await getSuggestionsService();
    return NextResponse.json(
      { data },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest
) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid id' },
        { status: 400 }
      );
    }

    await voteSuggestionService(id);

    return NextResponse.json(
      { message: 'Vote counted' },
      { status: 200 }
    );
  } catch (error) {
		if (
      error instanceof Error &&
      error.message === "NOT_FOUND"
    ) {
      return NextResponse.json(
        { error: "Suggestion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}