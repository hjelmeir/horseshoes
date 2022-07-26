import { Resource, Resources } from '../models/resource';
export declare const defaultResources: {
    isLoading: boolean;
    error: boolean;
    errorTrace: {};
    keys: never[];
    data: {};
};
export declare const initResources: <M extends Resource>(data?: Resources<M> | undefined) => Resources<M>;
export declare const createResource: <M extends Resource>(state: Resources<M>, payload?: M | undefined, defaultResource?: M | undefined) => Readonly<Resources<M>>;
export declare const upsertResource: <M extends Resource>(state: Resources<M>, payload?: M | undefined, defaultResource?: M | undefined) => Readonly<Resources<M>>;
export declare const updateResource: <M extends Resource>(state: Resources<M>, payload?: M | undefined) => Readonly<Resources<M>>;
export declare const updateResources: <M extends Resource>(state: Resources<M>, payload?: readonly M[] | undefined) => Readonly<Resources<M>>;
export declare const deleteResource: <M extends Resource>(state: Resources<M>, payload?: M | undefined) => Readonly<Resources<M>>;
export declare const deleteResourcesBy: <M extends Resource>(matches: readonly [string, string], state: Resources<M>, payload?: M | undefined) => Readonly<Resources<M>>;
