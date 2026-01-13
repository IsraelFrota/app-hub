"use client";

import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { FeedbackType } from "@/schema/feedbackSchema";

type FeedbackFormProps = {
	feedbackForm: ReturnType<typeof useForm<FeedbackType>>;
	onSubmit: (value: FeedbackType) => Promise<void>;
	loading: boolean;
}

export function FeedbackForm({ feedbackForm, onSubmit, loading }: FeedbackFormProps) {
	return (
		<fieldset disabled={loading}>
			<Form {...feedbackForm}>
				<form
					className="space-y-3"
					onSubmit={feedbackForm.handleSubmit(onSubmit)}
				>
					<div>
						<FormField
							control={feedbackForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome (opcional)</FormLabel>
									<FormControl>
										<Input type="text" { ...field } placeholder="Anakin Skywalker" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div>
						<FormField
							control={feedbackForm.control}
							name="suggestion"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua sugestão de melhoria</FormLabel>
									<FormControl>
										<Textarea { ...field } placeholder="My suggestion is..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Separator />

					<Button
						type="submit"
						disabled={loading}
					>
						Enviar Feedback
					</Button>
				</form>
			</Form>
		</fieldset>
	);
}