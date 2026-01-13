import {
	NextRequest,
	NextResponse,
} from "next/server";

import { connectToDatabaseV2 } from "@/lib/mongoose";

import { Suggestion } from "@/model/model";

import { feedbackSchema } from "@/schema/feedbackSchema";


export async function POST(request: NextRequest) {
	await connectToDatabaseV2();

	const feedbackData = await request.json();

	const parsed = feedbackSchema.safeParse(feedbackData);

	if (!parsed.success) {
		return NextResponse.json({ error: "Erro ao validar informações do formulário" }, { status: 400 });
	}

	await Suggestion.create(feedbackData);
	return NextResponse.json({ message: "Feedback criado com sucesso." }, { status: 201 });
} 

export async function GET() {
  try {
    await connectToDatabaseV2();
    const response = await Suggestion.find().lean();

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar sugestões." },
      { status: 500 }
    );
  }
}