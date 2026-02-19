import { type App } from "@/lib/link";

type AppCardProps = {
	item: App;
};

export function AppCard({ item }: AppCardProps) {
	return (
		<div
			className="bg-black/50 backdrop-blur-xl border border-black/10 shadow-lg rounded-sm p-4 flex items-center gap-3 transition hover:bg-black/70 cursor-pointer"
			onClick={() => window.open(item.url, '_blank')}
		>
			<span className="text-2xl">{item.icon}</span>
			<div>
				<p className="text-white font-medium">{item.title}</p>
				<p className="text-gray-200 text-xs break">{item.description}</p>
			</div>
		</div>
	);
}