import { z } from "zod";

export const feedbackSchema = z.object({
	name: z.string().optional(),
	suggestion: z.string(),
	type: z.enum(["suggestion", "feedback"]),
	date: z.string(),
});
export type FeedbackType = z.infer<typeof feedbackSchema>;