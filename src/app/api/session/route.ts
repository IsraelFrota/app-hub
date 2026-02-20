import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const cookie = await cookies();
	const token = cookie.get("session");
	if (token?.name === "session" && token.value === process.env.TOKEN) {
		return NextResponse.json({ success: true }, { status: 200 });
	}
	return NextResponse.json({ success: false }, { status: 400 });
}