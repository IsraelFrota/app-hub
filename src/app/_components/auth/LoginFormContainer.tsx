'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { LoginFormView } from './LoginFormView';

import {
	loginSchema,
	type LoginForm,
} from '@/lib/schemas/login.schema';

export function LoginFormContainer() {
	const [loading, setLoading] = useState(false);

	const loginForm = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		}
	});

	async function onSubmit(values: LoginForm) {
		setLoading(true);
		try {
			const response = await fetch('/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password
				}),
			});

			if (!response.ok) {
				toast.error('Error ao logar');
				return;
			}

			toast.success('Login realizado com sucesso!');
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