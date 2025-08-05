'use client';

export default function ContaAzul() {
	function handleRedirectToContaAzul() {
		const clientId = process.env.NEXT_PUBLIC_CONTAAZUL_CLIENT_ID!;
		const redirectUri = process.env.NEXT_PUBLIC_CONTAAZUL_REDIRECT_URI!;
		const state = process.env.NEXT_PUBLIC_CONTAAZUL_STATE!;

		const authUrl = `https://auth.contaazul.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=openid+profile+aws.cognito.signin.user.admin`
		
		window.location.href = authUrl;
	}

	return (
		<div>
			<button onClick={handleRedirectToContaAzul}>
				Conectar com Conta Azul
			</button>
		</div>
	);
}
