'use client';

import { useForm } from 'react-hook-form';
import { FileText, Lightbulb, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';

import {
	Select,
	SelectItem,
	SelectValue,
	SelectGroup,
	SelectContent,
	SelectTrigger,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { type SuggestionForm } from '@/lib/schemas/suggestion.schema';

const MAX_TEXT_LENGTH = 500;

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
	const [showPreview, setShowPreview] = useState(false);
	const watchedText = suggestionForm.watch('text') || '';
	const watchedType = suggestionForm.watch('type');
	const watchedName = suggestionForm.watch('name') || '';

	return (
		<fieldset disabled={loading}>
			<Form {...suggestionForm}>
				<form
					className='space-y-4'
					onSubmit={suggestionForm.handleSubmit(onSubmit)}
				>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
						<FormField
							control={suggestionForm.control}
							name='name'
							render={({ field }) => (
								<FormItem className='sm:col-span-2'>
									<FormLabel>Nome (opcional)</FormLabel>
									<FormControl>
										<Input
											type='text'
											{...field}
											placeholder='Seu nome'
											className='h-9'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={suggestionForm.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className='min-w-full h-9'>
												<SelectValue placeholder='Selecione' />
											</SelectTrigger>
											<SelectContent className='min-w-full'>
												<SelectGroup>
													<SelectItem value='suggestion'>
														<div className='flex items-center gap-2'>
															<Lightbulb className='w-3.5 h-3.5' />
															<span>Sugestão</span>
														</div>
													</SelectItem>
													<SelectItem value='feedback'>
														<div className='flex items-center gap-2'>
															<FileText className='w-3.5 h-3.5' />
															<span>Feedback (privado)</span>
														</div>
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div>
						<div className='flex items-center justify-between mb-1.5'>
							<FormLabel>Sua sugestão ou feedback</FormLabel>
							<Button
								type='button'
								variant='ghost'
								size='sm'
								className='h-6 px-2 text-xs'
								onClick={() => setShowPreview(!showPreview)}
							>
								{showPreview ? (
									<>
										<EyeOff className='w-3 h-3 mr-1' />
										Editar
									</>
								) : (
									<>
										<Eye className='w-3 h-3 mr-1' />
										Visualizar
									</>
								)}
							</Button>
						</div>

						<FormField
							control={suggestionForm.control}
							name='text'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										{showPreview ? (
											<div className='min-h-[100px] p-3 bg-muted rounded-md text-sm'>
												{watchedText ? (
													<p className='whitespace-pre-wrap text-foreground/90'>
														{watchedText}
													</p>
												) : (
													<p className='text-muted-foreground italic'>
														Nenhum texto para visualizar...
													</p>
												)}
											</div>
										) : (
											<Textarea
												{...field}
												placeholder='Descreva sua sugestão ou feedback de melhoria...'
												className='min-h-[100px] resize-none'
												maxLength={MAX_TEXT_LENGTH}
											/>
										)}
									</FormControl>
									<div className='flex items-center justify-between'>
										<FormMessage />
										<span
											className={`text-xs ml-auto ${
												watchedText.length > MAX_TEXT_LENGTH * 0.9
													? 'text-destructive'
													: 'text-muted-foreground'
											}`}
										>
											{watchedText.length}/{MAX_TEXT_LENGTH}
										</span>
									</div>
								</FormItem>
							)}
						/>
					</div>

					{watchedText && (
						<div className='p-3 bg-muted/50 rounded-md'>
							<p className='text-xs text-muted-foreground mb-1.5'>Resumo:</p>
							<div className='flex items-center gap-2 flex-wrap'>
								<Badge variant={watchedType === 'suggestion' ? 'default' : 'secondary'}>
									{watchedType === 'suggestion' ? 'Sugestão' : 'Feedback'}
								</Badge>
								{watchedName && (
									<Badge variant='outline'>
										{watchedName}
									</Badge>
								)}
								<span className='text-xs text-muted-foreground'>
									{watchedText.length} caracteres
								</span>
							</div>
						</div>
					)}

					<Separator />

					<Button
						type='submit'
						disabled={loading || !watchedText.trim()}
						className='w-full sm:w-auto'
					>
						{loading ? 'Enviando...' : 'Enviar'}
					</Button>
				</form>
			</Form>
		</fieldset>
	);
}
