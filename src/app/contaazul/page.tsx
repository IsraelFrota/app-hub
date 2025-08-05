'use client';

export default function ContaAzul() {
	function handleRedirectToContaAzul() {
		const clientId = '1o8pf0gbo7hjjfchkacn4s0kfk';
		const redirectUri = 'https://app-hub-puce.vercel.app/api/contaazul/callback';
		const state = 'IsraelFrotaBpoFinanceiro937638104702';

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
