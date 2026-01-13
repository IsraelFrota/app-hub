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
