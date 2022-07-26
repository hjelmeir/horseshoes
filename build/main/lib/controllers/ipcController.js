"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIpcMiddleware = exports.ipcResourceHandler = void 0;
const ipcResourceHandler = (_, type, payload) => ({
    type,
    payload,
});
exports.ipcResourceHandler = ipcResourceHandler;
const createIpcMiddleware = (renderer, events = {}) => {
    if (typeof events !== 'object') {
        throw new TypeError(`ipcListeners expects an events object as its first parameter, you passed type "${typeof events}"`);
    }
    Object.keys(events).forEach((key) => {
        if (typeof events[key] !== 'function') {
            throw new TypeError(`Each key in ipcListeners's must reference a dispatchable function, key "${key}" is of type "${typeof events[key]}"`);
        }
    });
    return ({ dispatch }) => {
        Object.keys(events).forEach((key) => {
            renderer.on(key, (event, payload) => {
                dispatch(events[key](event, key, payload));
            });
        });
        return (next) => (action) => next(action);
    };
};
exports.createIpcMiddleware = createIpcMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29udHJvbGxlcnMvaXBjQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFlTyxNQUFNLGtCQUFrQixHQUFnQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLElBQUk7SUFDSixPQUFPO0NBQ1IsQ0FBQyxDQUFDO0FBSFUsUUFBQSxrQkFBa0Isc0JBRzVCO0FBRUksTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxRQUFxQixFQUNyQixTQUEyQixFQUFFLEVBQ0UsRUFBRTtJQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixNQUFNLElBQUksU0FBUyxDQUNqQixrRkFBa0YsT0FBTyxNQUFNLEdBQUcsQ0FDbkcsQ0FBQztLQUNIO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNsQyxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUNyQyxNQUFNLElBQUksU0FBUyxDQUNqQiwyRUFBMkUsR0FBRyxpQkFBaUIsT0FBTyxNQUFNLENBQzVHLEdBQUcsQ0FDRixHQUFHLENBQ0wsQ0FBQztTQUNIO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQWlCLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBWSxFQUFFLE9BQVksRUFBRSxFQUFFO2dCQUM5QyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUE3QlcsUUFBQSxtQkFBbUIsdUJBNkI5QiJ9