import { AppCategory } from "@/lib/link";


export const categoryMeta: Record<
  AppCategory,
  { label: string; badgeClass: string }
> = {
  auditoria: {
    label: "Comitê 5s",
    badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  rh: {
    label: "RH",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  dp: {
    label: "DP",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  infra: {
    label: "Infra",
    badgeClass: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  utilidades: {
    label: "útil.",
    badgeClass: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
};
