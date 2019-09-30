import { Resource, Resources } from '../models/resource';

interface SortByDateOpts {
  readonly key: string;
  readonly direction: 'asc' | 'desc';
}

interface ToArrayOpts {
  readonly sortByDate?: SortByDateOpts;
}

export function sortByDate<M extends Resource>(
  records: readonly M[],
  { key, direction }: SortByDateOpts
): readonly M[] {
  return [...records].sort((a, b) => {
    if (!a[key] || !b[key]) {
      return 0;
    }

    if (direction === 'desc') {
      return new Date(b[key]).getTime() - new Date(a[key]).getTime();
    } else if (direction === 'asc') {
      return new Date(a[key]).getTime() - new Date(b[key]).getTime();
    } else {
      return 0;
    }
  });
}

export function toArray<M extends Resource>(
  resources: Resources<M>,
  options?: ToArrayOpts
): readonly M[] {
  const nextState = resources.keys
    .filter(k => typeof k === 'string' && resources.data[k])
    .map(k => resources.data[k]);

  if (options && options.sortByDate) {
    return sortByDate<M>(nextState, options.sortByDate);
  }

  return nextState;
}
