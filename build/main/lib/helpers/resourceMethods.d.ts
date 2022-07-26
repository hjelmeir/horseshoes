import { Resource, Resources } from '../models/resource';
interface OptionsObject {
    [key: string]: {
        label: string;
        name?: string;
        value?: string | number;
    };
}
interface SortByDateOpts {
    readonly key: string;
    readonly direction: 'asc' | 'desc';
}
interface ToArrayOpts {
    readonly sortByDate?: SortByDateOpts;
}
export declare function sortByDate<M extends Resource>(records: readonly M[], { key, direction }: SortByDateOpts): readonly M[];
export declare function toArray<M extends Resource>(resources: Resources<M>, options?: ToArrayOpts): readonly M[];
export declare function toOptions<M extends Resource>(resource: Resources<M>, ident: string): OptionsObject;
export {};
