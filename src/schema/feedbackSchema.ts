import { z } from "zod";

export const feedbackSchema = z.object({
	name: z.string().optional(),
	suggestion: z.string()
});
export type FeedbackType = z.infer<typeof feedbackSchema>;