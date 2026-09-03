'use client';

import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type FilterType = 'all' | 'suggestion' | 'feedback';
export type SortType = 'recent' | 'votes' | 'comments';

type SuggestionFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filterType: FilterType;
  onFilterTypeChange: (type: FilterType) => void;
  sortType: SortType;
  onSortTypeChange: (type: SortType) => void;
  totalCount: number;
  filteredCount: number;
};

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'suggestion', label: 'Sugestões' },
  { value: 'feedback', label: 'Feedbacks' },
];

const sortOptions: { value: SortType; label: string }[] = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'votes', label: 'Mais votados' },
  { value: 'comments', label: 'Mais comentados' },
];

export function SuggestionFilters({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  sortType,
  onSortTypeChange,
  totalCount,
  filteredCount,
}: SuggestionFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar sugestões ou feedbacks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filterType === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterTypeChange(option.value)}
              className="h-7 text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {filteredCount} de {totalCount}
          </Badge>

          <div className="flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={sortType}
              onChange={(e) => onSortTypeChange(e.target.value as SortType)}
              className="text-xs bg-transparent border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
