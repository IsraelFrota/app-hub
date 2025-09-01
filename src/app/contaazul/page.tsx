'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SiLinux } from "react-icons/si";

export default function ContaAzul() {
	function handleRedirectToContaAzul() {
		const clientId = process.env.NEXT_PUBLIC_CONTAAZUL_CLIENT_ID!;
		const redirectUri = process.env.NEXT_PUBLIC_CONTAAZUL_REDIRECT_URI!;
		const state = process.env.NEXT_PUBLIC_CONTAAZUL_STATE!;

		const authUrl = `https://auth.contaazul.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=openid+profile+aws.cognito.signin.user.admin`
		
		window.location.href = authUrl;
	}

	return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <SiLinux size={24} />
            Conectar à Conta Azul
          </CardTitle>
          <CardDescription>
            Conecte sua conta para sincronizar dados financeiros com segurança.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={handleRedirectToContaAzul}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg"
          >
            Conectar com Conta Azul
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
