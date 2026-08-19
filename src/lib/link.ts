import { ReactNode } from 'react';

export type AppCategory =
  | 'auditoria'
  | 'rh'
	| 'dp'
  | 'infra'
  | 'utilidades';

export type App = {
  id: string;
  title: string;
  icon: ReactNode;
  url: string;
  description: string;
  external: boolean;
	category: AppCategory;
};

const DEV_SERVER = process.env.NEXT_PUBLIC_DEV_SERVER ?? '';
const FILE_SERVER = process.env.NEXT_PUBLIC_FILE_SERVER ?? '';

if (!DEV_SERVER) {
  throw new Error('NEXT_PUBLIC_DEV_SERVER não definida');
}

if (!FILE_SERVER) {
  throw new Error('NEXT_PUBLIC_FILE_SERVER não definida');
}

export const apps: App[] = [
	{
		id: 'app-5s',
		title: 'App 5S',
		icon: '📋',
		url: `${DEV_SERVER}:3001`,
		description: 'Sistema para realização de auditorias da metodologia 5S.',
		external: true,
		category: 'auditoria',
	},
	{
		id: 'criterios-auditoria',
		title: 'Critérios de Auditoria',
		icon: '📖',
		url: 'https://docs.google.com/spreadsheets/d/10YdvT6qfqdJuHmHZp_KXCZ_8DV_h6C1bkgpsDwVKqsY/edit?usp=sharing',
		description: 'Planilha com os critérios de avaliação para a auditoria 5S.',
		external: true,
		category: 'auditoria',
	},
	{
		id: 'catalago-livros',
		title: 'Catálogo de Livros',
		icon: '📚',
		url: 'https://docs.google.com/spreadsheets/d/1Qd5tLyTvan9-EJuW2g_UYQaV7HRADrMuA402mDRNo2o/edit?gid=921363456#gid=921363456',
		description: 'Planilha do Google com o catálogo de livros disponíveis.',
		external: true,
		category: 'utilidades',
	},
	{
		id: 'dashboard-5s',
		title: 'Dashboard 5S',
		icon: '📊',
		url: `${DEV_SERVER}:3001/ui/dashboard`,
		description: 'Painel para visualização dos resultados das auditorias 5S.',
		external: true,
		category: 'auditoria',
	},
	{
		id: 'if-music',
		title: 'IF Music',
		icon: '🎵',
		url: `${DEV_SERVER}:9078`,
		description: 'Player de música local para streaming interno.',
		external: true,
		category: 'utilidades',
	},
	{
		id: 'if-controle-ponto',
		title: 'IF Controle de Ponto',
		icon: '🕰️',
		url: `${DEV_SERVER}:3008`,
		description: 'Sistema digital de controle de ponto para estagiários.',
		external: true,
		category: 'rh',
	},
	{
		id: 'servidor-arquivos',
		title: 'Servidor de Arquivos',
		icon: '🗄️',
		url: `${FILE_SERVER}`,
		description: 'Servidor local para gerenciamento e acesso a arquivos compartilhados.',
		external: true,
		category: 'infra',
	},
	{
		id: 'office-track',
		title: 'Office Track',
		icon: '🗂️',
		url: `${DEV_SERVER}:3010`,
		description: 'Sistema para colaboração e organização das atividades da empresa no setor de recursos humanos.',
		external: true,
		category: 'dp',
	},
	{
		id: 'horario-lanche',
		title: 'Horário do Lanche',
		icon: '🍔',
		url: 'https://docs.google.com/spreadsheets/d/1Ti7rzzUv6jqkb_9ih_zK3D9nyJwS8kPiTagHesTGHq4/edit?gid=0#gid=0',
		description: 'Planilha do Google contendo o cronograma de lanches.',
		external: true,
		category: 'utilidades',
	},
	{
		id: 'feedbacks',
		title: 'Feedbacks',
		icon: '📃',
		url: '/suggestion',
		description: 'Página com os feedbacks e sugestões dos colaboradores.',
		external: false,
		category: 'utilidades',
	},
	{
		id: 'empresas',
		title: 'Consulta de Empresas',
		icon: '🏢',
		url: `${DEV_SERVER}:3014`,
		description: 'Acesse informações públicas de empresas',
		external: false,
		category: 'utilidades',
	},
	{
		id: 'dash-legalizacao',
		title: 'Dashboard Legalização',
		icon: '⚖️',
		url: 'https://legalizacao-ifcontabil.web.app/',
		description: 'Painel para acompanhamento do processo de legalização de empresas.',
		external: true,
		category: 'utilidades',
	},
	{
		id: 'customer',
		title: 'Controle de Clientes',
		icon: '👥',
		url: 'https://client-control-ifcontabil.web.app/',
		description: 'Sistema para gerenciamento e cadastro de clientes.',
		external: true,
		category: 'utilidades',
	},
	{
		id: 'atas',
		title: 'Registro de Atas',
		icon: '📋',
		url: 'https://atas-ifcontabil.web.app/',
		description: 'Registre e organize atas de reuniões.',
		external: true,
		category: 'utilidades',
	}
];