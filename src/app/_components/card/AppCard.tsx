import { type App } from "@/lib/link";
import { categoryMeta } from "@/lib/category-meta";

type AppCardProps = {
	item: App;
};

export function AppCard({ item }: AppCardProps) {
  const category = categoryMeta[item.category];

  return (
    <button
      onClick={
        item.external ? 
        () => window.open(item.url, '_blank') :
        () => window.open(item.url)
      }
      className="w-full bg-black/50 backdrop-blur-xl border border-black/10 shadow-lg rounded-md p-4 flex items-start gap-3 transition hover:bg-black/70 active:scale-[0.98] text-left"
    >
      <span className="text-xl sm:text-2xl shrink-0">
        {item.icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-white font-medium text-sm truncate">
            {item.title}
          </p>
          <span
            className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${category.badgeClass}`}
          >
            {category.label}
          </span>
        </div>

        <p className="text-gray-200 text-xs sm:text-sm mt-1 break-words line-clamp-2">
          {item.description}
        </p>
      </div>
    </button>
  );
}