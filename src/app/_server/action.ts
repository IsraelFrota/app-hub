"use server";

import { cookies } from "next/headers";

import { type LoginForm, loginSchema } from "@/schema/loginSchema";

export async function loginAction(data: LoginForm) {
	const parsed = loginSchema.safeParse(data);

	if(!parsed.success) {
		return {
			success: false,
			errors: parsed.error.flatten().fieldErrors,
		};
	}

	(await cookies()).set("session", process.env.TOKEN!, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/"
	});
}