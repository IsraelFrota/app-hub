'use client';

export default function ContaAzul() {
	function handleRedirectToContaAzul() {
		const clientId = process.env.NEXT_PUBLIC_CONTAAZUL_CLIENT_ID!;
		const redirectUri = process.env.NEXT_PUBLIC_CONTAAZUL_REDIRECT_URI!;
		const scope = 'sales';

		const authUrl = `https://api.contaazul.com/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

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
