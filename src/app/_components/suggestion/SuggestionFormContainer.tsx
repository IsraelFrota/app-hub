"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { SuggestionFormView } from "@/app/_components/suggestion/SuggestionFormView";

import {
  suggestionSchema,
  type SuggestionForm,
} from "@/schema/suggestionSchema";

export function SuggestionFormContainer() {
  const [loading, setLoading] = useState(false);

  const suggestionForm = useForm<SuggestionForm>({
    resolver: zodResolver(suggestionSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      suggestion: "",
      type: "suggestion",
      date: `${new Date()}`,
      vote: 0,
    }
  });

  async function onSubmit(values: SuggestionForm) {
    setLoading(true);
    try {
      const response = await fetch("/api/mongo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          suggestion: values.suggestion,
          date: values.date,
          type: values.type,
          vote: 0,
        }),
      });

      if (!response.ok) {
        toast.error("Error ao registrar");
        return;
      }

      toast.success("Registrado com sucesso!");
    } catch (error) {
      console.error(error);
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