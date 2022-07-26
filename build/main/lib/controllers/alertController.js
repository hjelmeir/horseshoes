"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertReducer = exports.deleteAlerts = exports.deleteAlert = exports.createAlert = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
/**
 * Publish an alert
 */
const createAlert = (payload) => ({
    type: models_1.ALERT.CREATE,
    payload,
});
exports.createAlert = createAlert;
/**
 * Dismiss an alert
 */
const deleteAlert = (payload) => ({
    type: models_1.ALERT.DELETE,
    payload,
});
exports.deleteAlert = deleteAlert;
const deleteAlerts = () => ({
    type: models_1.ALERTS.DELETE,
});
exports.deleteAlerts = deleteAlerts;
const alertReducer = (state = helpers_1.initResources(), { type, payload }) => {
    if (!type || !payload) {
        return state;
    }
    switch (type) {
        case models_1.ALERTS.DELETE:
            return helpers_1.initResources();
        case models_1.ALERT.CREATE:
            return helpers_1.createResource(state, payload, models_1.defaultAlert);
        case models_1.ALERT.DELETE:
            return helpers_1.deleteResource(state, payload);
        default:
            return state;
    }
};
exports.alertReducer = alertReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jb250cm9sbGVycy9hbGVydENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTJFO0FBQzNFLHNDQU9tQjtBQUVuQjs7R0FFRztBQUNJLE1BQU0sV0FBVyxHQUFHLENBQUMsT0FBYyxFQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQzNELElBQUksRUFBRSxjQUFLLENBQUMsTUFBTTtJQUNsQixPQUFPO0NBQ1IsQ0FBQyxDQUFDO0FBSFUsUUFBQSxXQUFXLGVBR3JCO0FBRUg7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQWMsRUFBZSxFQUFFLENBQUMsQ0FBQztJQUMzRCxJQUFJLEVBQUUsY0FBSyxDQUFDLE1BQU07SUFDbEIsT0FBTztDQUNSLENBQUMsQ0FBQztBQUhVLFFBQUEsV0FBVyxlQUdyQjtBQUVJLE1BQU0sWUFBWSxHQUFHLEdBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLElBQUksRUFBRSxlQUFNLENBQUMsTUFBTTtDQUNwQixDQUFDLENBQUM7QUFGVSxRQUFBLFlBQVksZ0JBRXRCO0FBRUksTUFBTSxZQUFZLEdBQUcsQ0FDMUIsUUFBMEIsdUJBQWEsRUFBUyxFQUNoRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQWUsRUFDWixFQUFFO0lBQ3BCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDckIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxlQUFNLENBQUMsTUFBTTtZQUNoQixPQUFPLHVCQUFhLEVBQVMsQ0FBQztRQUVoQyxLQUFLLGNBQUssQ0FBQyxNQUFNO1lBQ2YsT0FBTyx3QkFBYyxDQUFRLEtBQUssRUFBRSxPQUFPLEVBQUUscUJBQVksQ0FBQyxDQUFDO1FBRTdELEtBQUssY0FBSyxDQUFDLE1BQU07WUFDZixPQUFPLHdCQUFjLENBQVEsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9DO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUM7QUFyQlcsUUFBQSxZQUFZLGdCQXFCdkIifQ==