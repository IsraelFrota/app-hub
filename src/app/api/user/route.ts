import {
	NextRequest,
	NextResponse,
} from "next/server";
import { verifyLogin } from "@/services/login.service";


export async function POST(request: NextRequest) {
	const { email, password } = await request.json();
	if (!email || !password) {
		return NextResponse.json(
			{ error: "Erro ao validar dados" }, 
			{ status: 400 }
		);
	}

	const success = await verifyLogin(email, password);

	return NextResponse.json(
		{ success },
		{ status: success ? 200 : 400 }
	);
} 
