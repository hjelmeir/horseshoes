export const ipcResourceHandler = (_, type, payload) => ({
    type,
    payload,
});
export const createIpcMiddleware = (renderer, events = {}) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29udHJvbGxlcnMvaXBjQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBZ0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRSxJQUFJO0lBQ0osT0FBTztDQUNSLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLENBQ2pDLFFBQXFCLEVBQ3JCLFNBQTJCLEVBQUUsRUFDRSxFQUFFO0lBQ2pDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzlCLE1BQU0sSUFBSSxTQUFTLENBQ2pCLGtGQUFrRixPQUFPLE1BQU0sR0FBRyxDQUNuRyxDQUFDO0tBQ0g7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2xDLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxTQUFTLENBQ2pCLDJFQUEyRSxHQUFHLGlCQUFpQixPQUFPLE1BQU0sQ0FDNUcsR0FBRyxDQUNGLEdBQUcsQ0FDTCxDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBaUIsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFZLEVBQUUsT0FBWSxFQUFFLEVBQUU7Z0JBQzlDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9