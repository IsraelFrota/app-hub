import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.nonempty("O e-mail é obrigatório")
		.toLowerCase(),
	password: z
		.string()
		.min(6, "A senha deve possuir pelo menos 6 caracteres")
		.nonempty("A senha é obrigatória"),
});

export type LoginForm = z.infer<typeof loginSchema>;
