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

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,

} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { type SuggestionForm } from "@/schema/suggestionSchema";

type SuggestionFormProps = {
	suggestionForm: ReturnType<typeof useForm<SuggestionForm>>;
	onSubmit: (value: SuggestionForm) => Promise<void>;
	loading: boolean;
};

export function SuggestionFormView({
	loading,
	onSubmit,
	suggestionForm,
}: SuggestionFormProps) {
	return (
		<fieldset disabled={loading}>
			<Form {...suggestionForm}>
				<form
					className="space-y-3"
					onSubmit={suggestionForm.handleSubmit(onSubmit)}
				>
					<div className="grid grid-cols-3 gap-2">
						<FormField
							control={suggestionForm.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Nome (opcional)</FormLabel>
									<FormControl>
										<Input type="text" {...field} placeholder="Anakin Skywalker" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={suggestionForm.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="min-w-full">
												<SelectValue placeholder="Selecione um tipo" />
											</SelectTrigger>
											<SelectContent className="min-w-full">
												<SelectGroup>
													<SelectItem value="suggestion">Sugestão</SelectItem>
													<SelectItem value="feedback">Feedback</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div>
						<FormField
							control={suggestionForm.control}
							name="text"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua sugestão ou feedback de melhoria</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="My suggestion is..." />
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
						Enviar
					</Button>
				</form>
			</Form>
		</fieldset>
	);
}