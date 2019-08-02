import { union, merge } from "lodash";
import { produce } from "immer";
import { Resources, Resource } from "../models/resource";

export function toArray<M extends Resource>(resources: Resources<M>): M[] {
  return resources.keys
    .filter(k => typeof k === "string" && resources.data[k])
    .map(k => resources.data[k]);
}

export const defaultResources = {
  isLoading: false,
  error: false,
  errorTrace: {},
  keys: [],
  data: {}
};

export const initResources = <M extends Resource>(
  data?: Resources<M>
): Resources<M> => {
  return {
    ...defaultResources,
    ...data
  };
};

export const createResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M,
  defaultResource?: M
): Resources<M> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true
      newState.errorTrace['createResource'] = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    })
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = union(newState.keys, [payload.key]);
    newState.data[payload.key] = merge(
      defaultResource,
      newState.data[payload.key],
      payload
    );
  }) as Resources<M>;
};

export const updateResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M
): Resources<M> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true
      newState.errorTrace['updateResource'] = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    })
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = union(newState.keys, [payload.key]);
    newState.data[payload.key] = merge(newState.data[payload.key], payload);
  }) as Resources<M>;
};

export const deleteResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M
): Resources<M> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true
      newState.errorTrace['deleteResource'] = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`
    })
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = newState.keys.filter((key: string) => key !== payload.key);
    delete newState.data[payload.key];
  }) as Resources<M>;
};

export const deleteResourcesBy = <M extends Resource>(
  matches: [string, string],
  state: Resources<M>,
  payload?: M
): Resources<M> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true
      newState.errorTrace['deleteResourceBy'] = `No matches found in state for: ${matches[0]}, ${matches[1]}`
    })
  }

  let dataArr = toArray<M>(state).filter(
    record => record[matches[0]] === matches[1]
  );
  let dataKeys = dataArr.map(record => record.key);

  if (dataArr.length === 0 || !dataArr[0].key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true
      newState.errorTrace['deleteResourceBy'] = `No matches found in state for: ${matches[0]}, ${matches[1]}`
    })
  }

  return (produce(state, (newState: Resources<M>) => {
    newState.keys = newState.keys.filter(
      (key: string) => !dataKeys.includes(key)
    );
    dataArr.forEach(record => delete newState.data[record.key]);
  }) as Resources<M>) as Resources<M>;
};
