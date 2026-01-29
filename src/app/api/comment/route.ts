import { NextRequest, NextResponse } from "next/server";
import { connectToDatabaseV2 } from "@/lib/mongoose";
import { getSuggestionModel } from "@/model/model";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  await connectToDatabaseV2();

  const { suggestionId, author, text } = await request.json();

  if (!suggestionId || !text) {
    return NextResponse.json(
      { error: "Erro ao validar dados" },
      { status: 400 }
    );
  }

  const Suggestion = await getSuggestionModel();

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

  return NextResponse.json(
    {
      message: "Comentário salvo com sucesso.",
      comment,
    },
    { status: 200 }
  );
}
