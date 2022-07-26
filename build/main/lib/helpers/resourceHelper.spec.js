"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const alertController_1 = require("../controllers/alertController");
const alert_1 = require("../models/alert");
const resourceHelper_1 = require("./resourceHelper");
const alert1 = {
    key: 'alert1',
    status: 'error',
    message: 'alert 1 message',
};
const alert2 = Object.assign(Object.assign({}, alert_1.defaultAlert), { key: 'alert2', status: 'error', message: 'alert 2 message' });
const alert1Action = { type: alert_1.ALERT.CREATE, payload: alert1 };
const alert2Action = { type: alert_1.ALERT.CREATE, payload: alert2 };
const state0 = resourceHelper_1.initResources();
const state1 = Object.assign(Object.assign({}, state0), { keys: ['alert1'], data: { alert1 } });
const state2 = Object.assign(Object.assign({}, state0), { keys: ['alert1', 'alert2'], data: { alert1, alert2 } });
const state3 = Object.assign(Object.assign({}, state0), { keys: ['alert1', 'alert2'], data: {
        alert1,
        alert2: Object.assign(Object.assign({}, alert2), { status: 'success' }),
    } });
ava_1.default('initResources sets default state', (t) => {
    t.deepEqual(state0, resourceHelper_1.defaultResources);
});
ava_1.default('createAlert returns expected action', (t) => {
    t.deepEqual(alertController_1.createAlert(alert1), alert1Action);
    t.deepEqual(alertController_1.createAlert(alert2), alert2Action);
});
ava_1.default('createResource updates state', (t) => {
    t.deepEqual(state1, resourceHelper_1.createResource(state0, alert1));
    t.deepEqual(state2, resourceHelper_1.createResource(state1, alert2));
    t.deepEqual(state2, resourceHelper_1.createResource(state1, { key: 'alert2', status: 'error', message: 'alert 2 message' }, alert_1.defaultAlert));
});
ava_1.default('createResource errs if key exists', (t) => {
    const nextState = Object.assign(Object.assign({}, state1), { error: true, errorTrace: {
            createResourceExists: 'Key already exists in state, key: alert1',
        } });
    t.deepEqual(nextState, resourceHelper_1.createResource(state1, alert1, alert_1.defaultAlert));
});
ava_1.default('updateResource', (t) => {
    t.deepEqual(state3, resourceHelper_1.upsertResource(state2, Object.assign(Object.assign({}, alert2), { status: 'success' })));
    t.deepEqual(state3, resourceHelper_1.upsertResource(state2, Object.assign(Object.assign({}, alert2), { status: 'success' }), alert_1.defaultAlert));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VIZWxwZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaGVscGVycy9yZXNvdXJjZUhlbHBlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBQ3ZCLG9FQUE2RDtBQUM3RCwyQ0FBMEU7QUFFMUUscURBSzBCO0FBRTFCLE1BQU0sTUFBTSxHQUFVO0lBQ3BCLEdBQUcsRUFBRSxRQUFRO0lBQ2IsTUFBTSxFQUFFLE9BQU87SUFDZixPQUFPLEVBQUUsaUJBQWlCO0NBQzNCLENBQUM7QUFDRixNQUFNLE1BQU0sbUNBQ1Asb0JBQVksS0FDZixHQUFHLEVBQUUsUUFBUSxFQUNiLE1BQU0sRUFBRSxPQUFPLEVBQ2YsT0FBTyxFQUFFLGlCQUFpQixHQUMzQixDQUFDO0FBQ0YsTUFBTSxZQUFZLEdBQWdCLEVBQUUsSUFBSSxFQUFFLGFBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQzFFLE1BQU0sWUFBWSxHQUFnQixFQUFFLElBQUksRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUUxRSxNQUFNLE1BQU0sR0FBcUIsOEJBQWEsRUFBUyxDQUFDO0FBQ3hELE1BQU0sTUFBTSxtQ0FDUCxNQUFNLEtBQ1QsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQ2hCLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUNqQixDQUFDO0FBQ0YsTUFBTSxNQUFNLG1DQUNQLE1BQU0sS0FDVCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQzFCLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FDekIsQ0FBQztBQUNGLE1BQU0sTUFBTSxtQ0FDUCxNQUFNLEtBQ1QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMxQixJQUFJLEVBQUU7UUFDSixNQUFNO1FBQ04sTUFBTSxrQ0FDRCxNQUFNLEtBQ1QsTUFBTSxFQUFFLFNBQVMsR0FDbEI7S0FDRixHQUNGLENBQUM7QUFFRixhQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxpQ0FBZ0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw2QkFBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3pDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLCtCQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsU0FBUyxDQUNULE1BQU0sRUFDTiwrQkFBYyxDQUNaLE1BQU0sRUFDTixFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsRUFDOUQsb0JBQVksQ0FDYixDQUNGLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzlDLE1BQU0sU0FBUyxtQ0FDVixNQUFNLEtBQ1QsS0FBSyxFQUFFLElBQUksRUFDWCxVQUFVLEVBQUU7WUFDVixvQkFBb0IsRUFBRSwwQ0FBMEM7U0FDakUsR0FDRixDQUFDO0lBRUYsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLG9CQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDM0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLGtDQUFPLE1BQU0sS0FBRSxNQUFNLEVBQUUsU0FBUyxJQUFHLENBQUMsQ0FBQztJQUU5RSxDQUFDLENBQUMsU0FBUyxDQUNULE1BQU0sRUFDTiwrQkFBYyxDQUFDLE1BQU0sa0NBQU8sTUFBTSxLQUFFLE1BQU0sRUFBRSxTQUFTLEtBQUksb0JBQVksQ0FBQyxDQUN2RSxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==