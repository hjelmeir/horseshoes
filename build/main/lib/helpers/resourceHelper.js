"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResourcesBy = exports.deleteResource = exports.updateResources = exports.updateResource = exports.upsertResource = exports.createResource = exports.initResources = exports.defaultResources = void 0;
const immer_1 = require("immer");
const union_1 = __importDefault(require("lodash/union"));
const resourceMethods_1 = require("./resourceMethods");
exports.defaultResources = {
    isLoading: false,
    error: false,
    errorTrace: {},
    keys: [],
    data: {},
};
const initResources = (data) => {
    return Object.assign(Object.assign({}, exports.defaultResources), data);
};
exports.initResources = initResources;
const createResource = (state, payload, defaultResource) => {
    if (!payload || !payload.key) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.createResourcePayload = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    if (state.data[payload.key]) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.createResourceExists = `Key already exists in state, key: ${payload.key}`;
        });
    }
    return immer_1.produce(state, (newState) => {
        newState.keys = union_1.default(newState.keys, [payload.key]);
        newState.data[payload.key] = Object.assign(Object.assign({}, defaultResource), payload);
    });
};
exports.createResource = createResource;
const upsertResource = (state, payload, defaultResource) => {
    if (!payload || !payload.key) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.upsertResourcePayload = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    return immer_1.produce(state, (newState) => {
        newState.keys = union_1.default(newState.keys, [payload.key]);
        newState.data[payload.key] = Object.assign(Object.assign(Object.assign({}, defaultResource), newState.data[payload.key]), payload);
    });
};
exports.upsertResource = upsertResource;
const updateResource = (state, payload) => {
    if (!payload || !payload.key) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.updateResource = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    return immer_1.produce(state, (newState) => {
        newState.keys = union_1.default(newState.keys, [payload.key]);
        newState.data[payload.key] = Object.assign(Object.assign({}, newState.data[payload.key]), payload);
    });
};
exports.updateResource = updateResource;
const updateResources = (state, payload) => {
    if (!payload || !Array.isArray(payload)) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.updateResources = `Missing payload, or payload is not array. Payload: ${payload}`;
        });
    }
    return immer_1.produce(state, (newState) => {
        payload.forEach((course) => {
            newState.keys = union_1.default(newState.keys, [course.key]);
            newState.data[course.key] = Object.assign(Object.assign({}, newState.data[course.key]), course);
        });
    });
};
exports.updateResources = updateResources;
const deleteResource = (state, payload) => {
    if (!payload || !payload.key) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.deleteResource = `Missing payload or key: Type: ${typeof payload}, Payload: ${payload}`;
        });
    }
    return immer_1.produce(state, (newState) => {
        newState.keys = newState.keys.filter((key) => key !== payload.key);
        delete newState.data[payload.key];
    });
};
exports.deleteResource = deleteResource;
const deleteResourcesBy = (matches, state, payload) => {
    if (!payload || !payload.key) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.deleteResourceBy = `No matches found in state for: ${matches[0]}, ${matches[1]}`;
        });
    }
    const dataArr = resourceMethods_1.toArray(state).filter((record) => record[matches[0]] === matches[1]);
    const dataKeys = dataArr.map((record) => record.key);
    if (dataArr.length === 0 || !dataArr[0].key) {
        return immer_1.produce(state, (newState) => {
            newState.error = true;
            newState.errorTrace.deleteResourceBy = `No matches found in state for: ${matches[0]}, ${matches[1]}`;
        });
    }
    return immer_1.produce(state, (newState) => {
        newState.keys = newState.keys.filter((key) => !dataKeys.includes(key));
        dataArr.forEach((record) => delete newState.data[record.key]);
    });
};
exports.deleteResourcesBy = deleteResourcesBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2hlbHBlcnMvcmVzb3VyY2VIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLHlEQUFpQztBQUVqQyx1REFBNEM7QUFFL0IsUUFBQSxnQkFBZ0IsR0FBRztJQUM5QixTQUFTLEVBQUUsS0FBSztJQUNoQixLQUFLLEVBQUUsS0FBSztJQUNaLFVBQVUsRUFBRSxFQUFFO0lBQ2QsSUFBSSxFQUFFLEVBQUU7SUFDUixJQUFJLEVBQUUsRUFBRTtDQUNULENBQUM7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUMzQixJQUFtQixFQUNMLEVBQUU7SUFDaEIsdUNBQ0ssd0JBQWdCLEdBQ2hCLElBQUksRUFDUDtBQUNKLENBQUMsQ0FBQztBQVBXLFFBQUEsYUFBYSxpQkFPeEI7QUFFSyxNQUFNLGNBQWMsR0FBRyxDQUM1QixLQUFtQixFQUNuQixPQUFXLEVBQ1gsZUFBbUIsRUFDSyxFQUFFO0lBQzFCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQzVCLE9BQU8sZUFBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQXNCLEVBQUUsRUFBRTtZQUMvQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN0QixRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixHQUFHLGlDQUFpQyxPQUFPLE9BQU8sY0FBYyxPQUFPLEVBQUUsQ0FBQztRQUNySCxDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLGVBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFzQixFQUFFLEVBQUU7WUFDL0MsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDdEIsUUFBUSxDQUFDLFVBQVUs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