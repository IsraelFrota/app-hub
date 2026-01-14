import {
	NextRequest,
	NextResponse,
} from "next/server";

import { connectToDatabaseV2 } from "@/lib/mongoose";

import { getSuggestionModel } from "@/model/model";

export async function PATCH(request: NextRequest) {
	await connectToDatabaseV2();

	const { id } = await request.json();

	if (!id) {
		return NextResponse.json({ error: "Erro ao validar dados" }, { status: 400 });
	}

	const Suggestion = await getSuggestionModel();
	const result = await Suggestion.updateOne(
		{ _id: id },
		{ $inc: { vote: 1 } }
	);

	if (result.matchedCount === 0) {
    return NextResponse.json(
      { error: "Sugestão não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Voto computado com sucesso." },
    { status: 200 }
  );
} 
