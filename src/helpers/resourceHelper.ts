import { union, merge } from "lodash";
import { Resources, Resource } from "../models/resource";

export function toArray<M extends Resource>(resources: Resources<M>): M[] {
  return resources.keys
    .filter(k => typeof k === "string" && resources.data[k])
    .map(k => resources.data[k]);
}

export const defaultResources = {
  isLoading: false,
  keys: [],
  data: {}
};

export function initResources<M extends Resource>(
  data?: Resources<M>
): Resources<M> {
  return {
    ...defaultResources,
    ...data
  };
}

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
      `Error in deleteResource, missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    );
    return state;
  }

  let newState = { ...state };
  newState.keys = newState.keys.filter((key: string) => key !== payload.key);
  delete newState.data[payload.key];

  return newState as Resources<M>;
}

export function deleteResourcesBy<M extends Resource>(
  matches: [string, string],
  state: Resources<M>,
  payload?: M
): Resources<M> {
  if (!payload || !payload.key) {
    console.log(
      `Error in deleteResourceBy, missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    );
    return state;
  }

  let newState = { ...state };
  let dataArr = toArray<M>(state).filter(
    record => record[matches[0]] === matches[1]
  );
  let dataKeys = dataArr.map(record => record.key);

  if (dataArr.length === 0 || !dataArr[0].key) {
    console.log(
      `Error in deleteResourceBy, no matches found in state for: ${
        matches[0]
      }, ${matches[1]}`
    );
    return state;
  }

  newState.keys = newState.keys.filter(
    (key: string) => !dataKeys.includes(key)
  );
  dataArr.forEach(record => delete newState.data[record.key]);

  return newState as Resources<M>;
}
