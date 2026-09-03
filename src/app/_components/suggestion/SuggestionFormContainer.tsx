'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { SuggestionFormView } from '@/app/_components/suggestion/SuggestionFormView';

import {
  suggestionSchema,
  type SuggestionForm,
} from '@/lib/schemas/suggestion.schema';

export function SuggestionFormContainer() {
  const [loading, setLoading] = useState(false);

  const suggestionForm = useForm<SuggestionForm>({
    resolver: zodResolver(suggestionSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      text: '',
      type: 'suggestion',
      vote: 0,
    }
  });

  async function onSubmit(values: SuggestionForm) {
    setLoading(true);
    try {
      const response = await fetch('/api/suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          text: values.text,
          type: values.type,
          vote: 0,
        }),
      });

      if (!response.ok) {
        toast.error('Erro ao registrar. Tente novamente.');
        return;
      }

      suggestionForm.reset();
      toast.success('Enviado com sucesso! Obrigado pela sua contribuição.');
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SuggestionFormView
      loading={loading}
      onSubmit={onSubmit}
      suggestionForm={suggestionForm}
    />
  );
}
