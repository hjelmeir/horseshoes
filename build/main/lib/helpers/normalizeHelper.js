"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePayload = exports.scrubPayload = exports.camelizeKeys = void 0;
const uuid_1 = require("uuid");
const isNumerical = (key) => {
    key = key - 0;
    return key === key;
};
const camelize = (key) => {
    if (isNumerical(key)) {
        return key.toString();
    }
    key = key.replace(/[\-_\s]+(.)?/g, (_match, chr) => chr ? chr.toUpperCase() : '');
    return key.substr(0, 1).toLowerCase() + key.substr(1);
};
const camelizeKeys = (obj) => {
    const nextState = {};
    Object.keys(obj).forEach((k) => {
        nextState[camelize(k)] = obj[k]
            ? typeof obj[k] === 'object' && obj[k].constructor.name === 'Object'
                ? exports.camelizeKeys(obj[k])
                : obj[k]
            : null;
    });
    return nextState;
};
exports.camelizeKeys = camelizeKeys;
const scrubPayload = (payload) => {
    const key = payload.nodeId || payload.id || payload.key || uuid_1.v4();
    return Object.assign(Object.assign({}, payload), { key });
};
exports.scrubPayload = scrubPayload;
const normalizePayload = (payload) => {
    if (Array.isArray(payload)) {
        return payload.map((r) => (Object.assign({}, exports.scrubPayload(exports.camelizeKeys(r)))));
    }
    return exports.scrubPayload(exports.camelizeKeys(payload));
};
exports.normalizePayload = normalizePayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBMEI7QUFNMUIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUMvQixHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNkLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQy9CLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQ2pELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQzdCLENBQUM7SUFFRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFVLEVBQVMsRUFBRTtJQUNoRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVE7Z0JBQ2xFLENBQUMsQ0FBQyxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFWVyxRQUFBLFlBQVksZ0JBVXZCO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBa0IsT0FBVSxFQUFZLEVBQUU7SUFDcEUsTUFBTSxHQUFHLEdBQVcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksU0FBRSxFQUFFLENBQUM7SUFFeEUsdUNBQVksT0FBTyxLQUFFLEdBQUcsSUFBRztBQUM3QixDQUFDLENBQUM7QUFKVyxRQUFBLFlBQVksZ0JBSXZCO0FBRUssTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQXdCLEVBQW1CLEVBQUU7SUFDNUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQVEsT0FBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1CQUNsQyxvQkFBWSxDQUFDLG9CQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDaEMsQ0FBWSxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxvQkFBWSxDQUFDLG9CQUFZLENBQUMsT0FBTyxDQUFDLENBQVUsQ0FBQztBQUN0RCxDQUFDLENBQUM7QUFSVyxRQUFBLGdCQUFnQixvQkFRM0IifQ==