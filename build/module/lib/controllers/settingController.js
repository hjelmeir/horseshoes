import { SETTING } from '../models/setting';
export const drawerToggle = (identifier, collapse) => ({
    type: SETTING.DRAWER_TOGGLE,
    payload: {
        [identifier]: { collapse }
    }
});
export const settingReducer = (state, action) => {
    if (state === undefined)
        return {};
    const { payload, type } = action;
    if (!payload || !type)
        return state;
    switch (type) {
        case SETTING.DRAWER_TOGGLE:
            return {
                ...state,
                drawers: {
                    ...state.drawers,
                    ...payload
                }
            };
        default:
            return state;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NvbnRyb2xsZXJzL3NldHRpbmdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sbUJBQW1CLENBQUE7QUFFckUsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsVUFBa0IsRUFBRSxRQUFpQixFQUFrQixFQUFFLENBQUMsQ0FBQztJQUN0RixJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWE7SUFDM0IsT0FBTyxFQUFFO1FBQ1AsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtLQUMzQjtDQUNGLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQWUsRUFBRSxNQUFzQixFQUFZLEVBQUU7SUFDbEYsSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLE9BQU8sRUFBRSxDQUFBO0lBRWxDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO0lBRWhDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFFbkMsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLE9BQU8sQ0FBQyxhQUFhO1lBQ3hCLE9BQU87Z0JBQ0wsR0FBRyxLQUFLO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxHQUFHLEtBQUssQ0FBQyxPQUFPO29CQUNoQixHQUFHLE9BQU87aUJBQ1g7YUFDRixDQUFBO1FBRUg7WUFDRSxPQUFPLEtBQUssQ0FBQTtLQUNmO0FBQ0gsQ0FBQyxDQUFBIn0=