"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOptions = exports.toArray = exports.sortByDate = void 0;
function sortByDate(records, { key, direction }) {
    return [...records].sort((a, b) => {
        if (!a[key] || !b[key]) {
            return 0;
        }
        if (direction === 'desc') {
            return new Date(b[key]).getTime() - new Date(a[key]).getTime();
        }
        else if (direction === 'asc') {
            return new Date(a[key]).getTime() - new Date(b[key]).getTime();
        }
        else {
            return 0;
        }
    });
}
exports.sortByDate = sortByDate;
function toArray(resources, options) {
    const nextState = resources.keys
        .filter((k) => typeof k === 'string' && resources.data[k])
        .map((k) => resources.data[k]);
    if (options && options.sortByDate) {
        return sortByDate(nextState, options.sortByDate);
    }
    return nextState;
}
exports.toArray = toArray;
function toOptions(resource, ident) {
    const options = {};
    resource.keys.forEach((key) => {
        options[resource.data[key][ident]] = {
            label: resource.data[key][ident],
        };
    });
    return options;
}
exports.toOptions = toOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VNZXRob2RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9oZWxwZXJzL3Jlc291cmNlTWV0aG9kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFtQkEsU0FBZ0IsVUFBVSxDQUN4QixPQUFxQixFQUNyQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQWtCO0lBRWxDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFDeEIsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoRTthQUFNLElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtZQUM5QixPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hFO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBakJELGdDQWlCQztBQUVELFNBQWdCLE9BQU8sQ0FDckIsU0FBdUIsRUFDdkIsT0FBcUI7SUFFckIsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUk7U0FDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ2pDLE9BQU8sVUFBVSxDQUFJLFNBQVMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDckQ7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBYkQsMEJBYUM7QUFFRCxTQUFnQixTQUFTLENBQ3ZCLFFBQXNCLEVBQ3RCLEtBQWE7SUFFYixNQUFNLE9BQU8sR0FBa0IsRUFBRSxDQUFDO0lBRWxDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDcEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRztZQUNuQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDakMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQWJELDhCQWFDIn0=