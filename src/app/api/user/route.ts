import {
	NextRequest,
	NextResponse,
} from "next/server";
import {
	compare,
} from "bcrypt"

import { connectToDatabaseV2 } from "@/lib/mongoose";

import { getUserModel } from "@/model/model";

export async function POST(request: NextRequest) {
	await connectToDatabaseV2();

	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json({ error: "Erro ao validar dados" }, { status: 400 });
	}

	const User = await getUserModel();
	const result: {
		_id: string,
		email: string,
		password: string,
	} | null = await User.findOne({ email: email });

	if (!result) {
		return NextResponse.json(
			{ success: false },
			{ status: 400 }
		);	
	}

	const isCorrectPassword = await compare(password, result.password);

	if (isCorrectPassword) {
		return NextResponse.json(
			{ success: true },
			{ status: 200 }
		);
	}

	return NextResponse.json(
		{ success: false },
		{ status: 400 }
	);
} 
