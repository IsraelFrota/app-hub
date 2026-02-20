"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginAction } from "@/app/_server/action";
import {
	loginSchema,
	type LoginFormType,
} from "@/schemas/login.schema";
import { LoginFormView } from "./LoginFormView";


export function LoginFormContainer() {
	const [loading, setLoading] = useState(false);

	const loginForm = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		}
	});

	async function onSubmit(values: LoginFormType) {
		setLoading(true);
		try {
			const response = await fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password
				}),
			});

			if (!response.ok) {
				toast.error("Error ao logar");
				return;
			}

			toast.success("Login realizado com sucesso!");
			loginAction(values);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<LoginFormView
			loading={loading}
			onSubmit={onSubmit}
			loginForm={loginForm}
		/>
	);
}
