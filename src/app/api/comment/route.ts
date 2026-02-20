import { 
  NextRequest, 
  NextResponse 
} from "next/server";
import { addComment } from "@/services/suggestion.service";


export async function POST(request: NextRequest) {
  const { suggestionId, author, text } = await request.json();
  if (!suggestionId || !text) {
    return NextResponse.json(
      { error: "Erro ao validar dados" },
      { status: 400 }
    );
  }

  const comment = await addComment(suggestionId, author, text);
  return NextResponse.json(
    {
      message: "Comentário salvo com sucesso.",
      comment,
    },
    { status: 200 }
  );
}
