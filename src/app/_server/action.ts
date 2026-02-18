"use server";

import { cookies } from "next/headers";

import { type LoginSchema, loginSchema } from "./schema";

export async function loginAction(data: LoginSchema) {
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

export async function createUserAction(data: LoginSchema) {
	const parsed = loginSchema.safeParse(data);

	if(!parsed.success) {
		return {
			success: false,
			errors: parsed.error.flatten().fieldErrors,
		};
	}
	
}