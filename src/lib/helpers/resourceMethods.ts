import { Resources, Resource } from "../models/resource";

interface SortByDateOpts {
  key: string
  direction: 'asc' | 'desc'
}

interface ToArrayOpts {
  sortByDate?: SortByDateOpts
}

export function sortByDate<M extends Resource>(records: M[], { key, direction}: SortByDateOpts): M[] {
  return records.sort((a, b) => {
    if (!a[key] || !b[key]) return 0

    if (direction === 'desc') {
      return (new Date(b[key]).getTime()) - (new Date(a[key]).getTime())
    }
    else if (direction === 'asc') {
      return (new Date(a[key]).getTime()) - (new Date(b[key]).getTime())
    } else {
      return 0
    }
  })
}

export function toArray<M extends Resource>(resources: Resources<M>, options?: ToArrayOpts): M[] {
  let nextState = resources.keys
    .filter(k => typeof k === "string" && resources.data[k])
    .map(k => resources.data[k]);

  if (options && options.sortByDate) {
    nextState = sortByDate<M>(nextState, options.sortByDate)
  }

  return nextState
}
