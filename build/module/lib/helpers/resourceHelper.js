import { produce } from 'immer';
import union from 'lodash/union';
import { toArray } from './resourceMethods';
export const defaultResources = {
    isLoading: false,
    error: false,
    errorTrace: {},
    keys: [],
    data: {},
};
export const initResources = (data) => {
    return {
        ...defaultResources,
        ...data,
    };
};
export const createResource = (state, payload, defaultResource) => {
    if (!payload || !payload.key) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.createResourcePayload = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    if (state.data[payload.key]) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.createResourceExists = `Key already exists in state, key: ${payload.key}`;
        });
    }
    return produce(state, (newState) => {
        newState.keys = union(newState.keys, [payload.key]);
        newState.data[payload.key] = { ...defaultResource, ...payload };
    });
};
export const upsertResource = (state, payload, defaultResource) => {
    if (!payload || !payload.key) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.upsertResourcePayload = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    return produce(state, (newState) => {
        newState.keys = union(newState.keys, [payload.key]);
        newState.data[payload.key] = {
            ...defaultResource,
            ...newState.data[payload.key],
            ...payload,
        };
    });
};
export const updateResource = (state, payload) => {
    if (!payload || !payload.key) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.updateResource = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    return produce(state, (newState) => {
        newState.keys = union(newState.keys, [payload.key]);
        newState.data[payload.key] = {
            ...newState.data[payload.key],
            ...payload,
        };
    });
};
export const updateResources = (state, payload) => {
    if (!payload || !Array.isArray(payload)) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.updateResources = `Missing payload, or payload is not array. Payload: ${payload}`;
        });
    }
    return produce(state, (newState) => {
        payload.forEach((course) => {
            newState.keys = union(newState.keys, [course.key]);
            newState.data[course.key] = {
                ...newState.data[course.key],
                ...course,
            };
        });
    });
};
export const deleteResource = (state, payload) => {
    if (!payload || !payload.key) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.deleteResource = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    return produce(state, (newState) => {
        newState.keys = newState.keys.filter((key) => key !== payload.key);
        delete newState.data[payload.key];
    });
};
export const deleteResourcesBy = (matches, state, payload) => {
    if (!payload || !payload.key) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.deleteResourceBy = `No matches found in state for: ${matches[0]}, ${matches[1]}`;
        });
    }
    const dataArr = toArray(state).filter((record) => record[matches[0]] === matches[1]);
    const dataKeys = dataArr.map((record) => record.key);
    if (dataArr.length === 0 || !dataArr[0].key) {
        return produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.deleteResourceBy = `No matches found in state for: ${matches[0]}, ${matches[1]}`;
        });
    }
    return produce(state, (newState) => {
        newState.keys = newState.keys.filter((key) => !dataKeys.includes(key));
        dataArr.forEach((record) => delete newState.data[record.key]);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2hlbHBlcnMvcmVzb3VyY2VIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNoQyxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFFakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLEtBQUssRUFBRSxLQUFLO0lBQ1osVUFBVSxFQUFFLEVBQUU7SUFDZCxJQUFJLEVBQUUsRUFBRTtJQUNSLElBQUksRUFBRSxFQUFFO0NBQ1QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUMzQixJQUFtQixFQUNMLEVBQUU7SUFDaEIsT0FBTztRQUNMLEdBQUcsZ0JBQWdCO1FBQ25CLEdBQUcsSUFBSTtLQUNSLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FDNUIsS0FBbUIsRUFDbkIsT0FBVyxFQUNYLGVBQW1CLEVBQ0ssRUFBRTtJQUMxQixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUM1QixPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFzQixFQUFFLEVBQUU7WUFDL0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxpQ0FBaUMsT0FBTyxPQUFPLGNBQWMsT0FBTyxFQUFFLENBQUM7UUFDckgsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxP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