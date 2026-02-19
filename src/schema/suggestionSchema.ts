import { z } from "zod";

export const suggestionSchema = z.object({
	name: z
		.string()
		.toLowerCase()
		.optional(),
	suggestion: z
		.string()
		.min(3, "Insira uma mensagem significativa"),
	type: z
		.enum(["suggestion", "feedback"]),
	date: z
		.string(),
	vote: z
		.number(),
});

export type SuggestionForm = z.infer<typeof suggestionSchema>;