"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingReducer = exports.drawerToggle = void 0;
const setting_1 = require("../models/setting");
const drawerToggle = (identifier, collapse) => ({
    type: setting_1.SETTING.DRAWER_TOGGLE,
    payload: {
        [identifier]: { collapse }
    }
});
exports.drawerToggle = drawerToggle;
const settingReducer = (state, action) => {
    if (state === undefined)
        return {};
    const { payload, type } = action;
    if (!payload || !type)
        return state;
    switch (type) {
        case setting_1.SETTING.DRAWER_TOGGLE:
            return Object.assign(Object.assign({}, state), { drawers: Object.assign(Object.assign({}, state.drawers), payload) });
        default:
            return state;
    }
};
exports.settingReducer = settingReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRyb2xsZXJzL3NldHRpbmdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUFxRTtBQUU5RCxNQUFNLFlBQVksR0FBRyxDQUFDLFVBQWtCLEVBQUUsUUFBaUIsRUFBa0IsRUFBRSxDQUFDLENBQUM7SUFDdEYsSUFBSSxFQUFFLGlCQUFPLENBQUMsYUFBYTtJQUMzQixPQUFPLEVBQUU7UUFDUCxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFO0tBQzNCO0NBQ0YsQ0FBQyxDQUFBO0FBTFcsUUFBQSxZQUFZLGdCQUt2QjtBQUVLLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBZSxFQUFFLE1BQXNCLEVBQVksRUFBRTtJQUNsRixJQUFJLEtBQUssS0FBSyxTQUFTO1FBQUUsT0FBTyxFQUFFLENBQUE7SUFFbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7SUFFaEMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUVuQyxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssaUJBQU8sQ0FBQyxhQUFhO1lBQ3hCLHVDQUNLLEtBQUssS0FDUixPQUFPLGtDQUNGLEtBQUssQ0FBQyxPQUFPLEdBQ2IsT0FBTyxLQUViO1FBRUg7WUFDRSxPQUFPLEtBQUssQ0FBQTtLQUNmO0FBQ0gsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsY0FBYyxrQkFvQjFCIn0=