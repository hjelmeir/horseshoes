import { produce } from 'immer';
import { union } from 'lodash';
import { Resource, Resources } from '../models/resource';
import { toArray } from './resourceMethods';

export const defaultResources = {
  isLoading: false,
  error: false,
  errorTrace: {},
  keys: [],
  data: {},
};

export const initResources = <M extends Resource>(
  data?: Resources<M>
): Resources<M> => {
  return {
    ...defaultResources,
    ...data,
  };
};

export const createResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M,
  defaultResource?: M
): Readonly<Resources<M>> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.createResourcePayload = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
    });
  }

  if (state.data[payload.key]) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.createResourceExists = `Key already exists in state, key: ${payload.key}`;
    });
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = union(newState.keys, [payload.key]);
    newState.data[payload.key] = { ...defaultResource, ...payload };
  });
};

export const upsertResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M,
  defaultResource?: M
): Readonly<Resources<M>> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.upsertResourcePayload = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
    });
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = union(newState.keys, [payload.key]);
    newState.data[payload.key] = {
      ...defaultResource,
      ...newState.data[payload.key],
      ...payload,
    };
  });
};

export const updateResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M
): Readonly<Resources<M>> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.updateResource = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
    });
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = union(newState.keys, [payload.key]);
    newState.data[payload.key] = {
      ...newState.data[payload.key],
      ...payload,
    };
  });
};

export const updateResources = <M extends Resource>(
  state: Resources<M>,
  payload?: readonly M[]
): Readonly<Resources<M>> => {
  if (!payload || !Array.isArray(payload)) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.updateResources = `Missing payload, or payload is not array. Payload: ${payload}`;
    });
  }

  return produce(state, (newState: Resources<M>) => {
    payload.forEach((course) => {
      newState.keys = union(newState.keys, [course.key]);
      newState.data[course.key] = {
        ...newState.data[course.key],
        ...course,
      };
    });
  });
};

export const deleteResource = <M extends Resource>(
  state: Resources<M>,
  payload?: M
): Readonly<Resources<M>> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.deleteResource = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
    });
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = newState.keys.filter((key: string) => key !== payload.key);
    delete newState.data[payload.key];
  }) as Resources<M>;
};

export const deleteResourcesBy = <M extends Resource>(
  matches: readonly [string, string],
  state: Resources<M>,
  payload?: M
): Readonly<Resources<M>> => {
  if (!payload || !payload.key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.deleteResourceBy = `No matches found in state for: ${matches[0]}, ${matches[1]}`;
    });
  }

  const dataArr = toArray<M>(state).filter(
    (record) => record[matches[0]] === matches[1]
  );
  const dataKeys = dataArr.map((record) => record.key);

  if (dataArr.length === 0 || !dataArr[0].key) {
    return produce(state, (newState: Resources<M>) => {
      newState.error = true;
      newState.errorTrace.deleteResourceBy = `No matches found in state for: ${matches[0]}, ${matches[1]}`;
    });
  }

  return produce(state, (newState: Resources<M>) => {
    newState.keys = newState.keys.filter(
      (key: string) => !dataKeys.includes(key)
    );
    dataArr.forEach((record) => delete newState.data[record.key]);
  }) as Resources<M>;
};
