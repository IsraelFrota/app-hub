import { type App } from "@/lib/link";

type AppCardProps = {
	item: App;
};

export function AppCard({ item }: AppCardProps) {
  return (
    <button
      onClick={() => window.open(item.url, '_blank')}
      className="w-full bg-black/50 backdrop-blur-xl border border-black/10 shadow-lg rounded-md p-4 flex items-start gap-3 transition hover:bg-black/70 active:scale-[0.98] text-left"
    >
      <span className="text-xl sm:text-2xl shrink-0">
        {item.icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-white font-medium text-sm sm:text-base truncate">
          {item.title}
        </p>

        <p className="text-gray-200 text-xs sm:text-sm mt-1 break-words line-clamp-2">
          {item.description}
        </p>
      </div>
    </button>
  );
}