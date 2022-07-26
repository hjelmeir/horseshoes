import { Resource } from '../models/resource';
declare type Dirty = Record<any, any>;
declare type Clean = Record<string, any>;
export declare const camelizeKeys: (obj: Dirty) => Clean;
export declare const scrubPayload: <T extends Record<string, any>>(payload: T) => Resource;
export declare const normalizePayload: (payload: Dirty | Dirty[]) => Clean | Clean[];
export {};
