export type App = {
	title: string;
	icon: string;
	url: string;
	description: string;
}

export const apps: App[] = [
	{
		title: 'App 5S',
		icon: '📋',
		url: 'http://192.168.0.18:3001/',
		description: 'Sistema para realização de auditorias da metodologia 5S.'
	},
	{
		title: 'Critérios de Auditoria',
		icon: '📖',
		url: 'https://docs.google.com/spreadsheets/d/10YdvT6qfqdJuHmHZp_KXCZ_8DV_h6C1bkgpsDwVKqsY/edit?usp=sharing',
		description: 'Planilha com os critérios de avaliação para a auditoria 5S.'
	},
	{
		title: 'Catálogo de Livros',
		icon: '📚',
		url: 'https://docs.google.com/spreadsheets/d/1Qd5tLyTvan9-EJuW2g_UYQaV7HRADrMuA402mDRNo2o/edit?gid=921363456#gid=921363456',
		description: 'Planilha do Google com o catálogo de livros disponíveis.'
	},
	{
		title: 'Dashboard 5S',
		icon: '📊',
		url: 'http://192.168.0.18:3001/ui/dashboard',
		description: 'Painel para visualização dos resultados das auditorias 5S.'
	},
	{
		title: 'IF Music',
		icon: '🎵',
		url: 'http://192.168.0.18:9078/',
		description: 'Player de música local para streaming interno.'
	},
	{
		title: 'IF Controle de Ponto',
		icon: '🕰️',
		url: 'http://192.168.0.18:3008/',
		description: 'Sistema digital de controle de ponto para estagiários.'
	},
	{
		title: 'Servidor de Arquivos',
		icon: '🗄️',
		url: 'http://192.168.0.99:8081/',
		description: 'Servidor local para gerenciamento e acesso a arquivos compartilhados.'
	},
	{
		title: 'Office Track',
		icon: '🗂️',
		url: 'http://192.168.0.18:3010/',
		description: 'Sistema para colaboração e organização das atividades da empresa no setor de recursos humanos.'
	},
	{title: 'Horário do Lanche',
		icon: '🍔',
		url: 'https://docs.google.com/spreadsheets/d/1Ti7rzzUv6jqkb_9ih_zK3D9nyJwS8kPiTagHesTGHq4/edit?gid=0#gid=0',
		description: 'Planilha do Google contendo o cronograma de lanches.'
	},
	{
		title: 'Feedbacks',
		icon: '📃',
		url: '/suggestion',
		description: 'Página com os feedbacks e sugestões dos colaboradores.'
	},
];