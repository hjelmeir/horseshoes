import { union, merge } from "lodash";

export interface Resource {
  key: string;
}

export interface Resources<M> {
  isLoading: boolean;
  keys: string[];
  data: {
    [key: string]: M;
  };
}

export interface ResourceAction<M> {
  type: string;
  payload?: M;
}

export interface ResourcesAction<M> {
  type: string;
  payload?: Resources<M>;
}

export function initResources<M extends Resources<M>>(): Resources<M> {
  return {
    isLoading: false,
    keys: [],
    data: {}
  }
};

//
// Helpers
//
export function createResource<M extends Resource>(
  state: Resources<M>,
  payload?: M,
  defaultResource?: M
): Resources<M> {
  if (!payload || !payload.key) {
    console.log(
      `Error in createResource, missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    );
    return state;
  }

  let newState = { ...state };
  newState.keys = union(newState.keys, [payload.key]);
  newState.data[payload.key] = merge(
    newState.data[payload.key],
    defaultResource,
    payload
  );

  return newState as Resources<M>;
}

export function updateResource<M extends Resource>(
  state: Resources<M>,
  payload?: M
): Resources<M> {
  if (!payload || !payload.key) {
    console.log(
      `Error in updateResource, missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    );
    return state;
  }

  let newState = { ...state };
  newState.keys = union(newState.keys, [payload.key]);
  newState.data[payload.key] = merge(newState.data[payload.key], payload);

  return newState as Resources<M>;
}

export function deleteResource<M extends Resource>(
  state: Resources<M>,
  payload?: M
): Resources<M> {
  if (!payload || !payload.key) {
    console.log(
      `Error in updateResource, missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    );
    return state;
  }

  let newState = { ...state };
  newState.keys = newState.keys.filter((key: string) => key !== payload.key);
  delete newState.data[payload.key];

  return newState as Resources<M>;
}

export function toArray<M extends Resource>(resources: Resources<M>): M[] {
  return resources.keys.map((key: string): M => resources.data[key]);
}
