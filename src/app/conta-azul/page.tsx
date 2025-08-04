export default function ContaAzul() {
	async function handleToken() {
		const response = await fetch('/api/contaazul/callback');

		if (response.ok) {
			const token = await response.json();
			console.log(token);
		}
	}

	return (
		<div>
			<button onClick={handleToken}>Chamar requisição</button>
		</div>
	);
}