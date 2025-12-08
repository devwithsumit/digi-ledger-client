import { useMemo } from 'react';

type Selector<T> = (item: T) => string | number | null | undefined;

export function useLocalSearch<T>(items: T[] = [], query: string, selectors: Selector<T>[]) {
  return useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      selectors.some((pick) => {
        const value = pick(item);
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [items, query, selectors]);
}