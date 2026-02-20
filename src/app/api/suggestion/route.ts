import {
	NextRequest,
	NextResponse,
} from "next/server";
import { 
	addVote, 
	createSuggestion, 
	getSuggestions 
} from "@/services/suggestion.service";


export async function GET() {
	try {
		const data = await getSuggestions();
		return NextResponse.json(
			{ data }, 
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Erro ao buscar sugestões." }, 
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
    const feedbackData = await request.json();
    const result = await createSuggestion(feedbackData);

	if (result === null) {
		return NextResponse.json(
			{ error: "Erro ao validar informações do formulário" }, 
			{ status: 400 }
		);
	}
	return NextResponse.json(
		{ message: "Feedback criado com sucesso." },
		{ status: 201 }
	);
}

export async function PATCH(request: NextRequest) {
	const { id } = await request.json();
	if (!id) {
		return NextResponse.json(
			{ error: "Erro ao validar dados" }, 
			{ status: 400 }
		);
	}

	const found = await addVote(id);
	if (!found) {
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
