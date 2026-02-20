import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectToDatabaseV2 } from "@/lib/mongoose";

import { getSuggestionModel } from "@/model/model";

import { suggestionSchema } from "@/schema/suggestionSchema";


export async function POST(request: NextRequest) {
  await connectToDatabaseV2();

  const suggestionData = await request.json();

  const parsed = suggestionSchema.safeParse(suggestionData);

  if (!parsed.success) {
    return NextResponse.json({
      error: "Erro ao validar informações do formulário" },
      { status: 400 }
    );
  }

  const Suggestion = await getSuggestionModel();
  await Suggestion.create(suggestionData);
  return NextResponse.json({
    message: "Criado com sucesso." },
    { status: 201 }
  );
}

export async function GET() {
  try {
    await connectToDatabaseV2();

    const Suggestion = await getSuggestionModel();
    const response = await Suggestion.find().lean();

    return NextResponse.json({
      data: response },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar dados." },
      { status: 500 }
    );
  }
}