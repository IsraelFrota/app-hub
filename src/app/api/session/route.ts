import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/services/session.service";


export async function GET(request: NextRequest) {
	const success = await verifySession();
	return NextResponse.json(
		{ success }, 
		{ status: success ? 200 : 400 }
	);
}
