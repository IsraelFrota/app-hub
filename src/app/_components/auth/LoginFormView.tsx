import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { type LoginForm } from "@/schema/loginSchema";

type LoginFormProps = {
	loginForm: ReturnType<typeof useForm<LoginForm>>;
	onSubmit: (value: LoginForm) => Promise<void>;
	loading: boolean;
};

export function LoginFormView({
	loading,	
	onSubmit,
	loginForm,
}: LoginFormProps) {
	return (
		<fieldset disabled={loading}>
			<Form { ...loginForm }>
				<form
					className="space-y-3"
					onSubmit={loginForm.handleSubmit(onSubmit)}
				>
					<div className="flex flex-col space-y-2">
						<FormField
							control={loginForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											{ ...field }
											type="email"
											placeholder="anakinskywalker@email.com.br"
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={loginForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											{ ...field }
											type="password"
											placeholder="**********"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<Separator />

					<Button
						type="submit"
						disabled={loading}
					>
						Entrar
					</Button>
				</form>
			</Form>
		</fieldset>
	);
}