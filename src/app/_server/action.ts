"use server";

import {
	LoginFormType, 
	loginSchema 
} from "@/schemas/login.schema";
import { setSession } from "@/services/session.service";


export async function loginAction(data: LoginFormType) {
	const parsed = loginSchema.safeParse(data);

	if(!parsed.success) {
		return {
			success: false,
			errors: parsed.error.flatten().fieldErrors,
		};
	}

	await setSession();
}

export async function createUserAction(data: LoginFormType) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // TODO: implementar cadastro de usuário
  // await createUser(parsed.data.email, parsed.data.password);
}
