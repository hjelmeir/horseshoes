"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelled = exports.select = exports.fork = exports.call = exports.take = void 0;
const effects_1 = require("redux-saga/effects");
function* take(pattern) {
    return yield effects_1.take(pattern);
}
exports.take = take;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* call(fn, ...args) {
    return yield effects_1.call(fn, ...args);
}
exports.call = call;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fork(fn, ...args) {
    return yield effects_1.fork(fn, ...args);
}
exports.fork = fork;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* select(selector, ...args) {
    return yield effects_1.select(selector, ...args);
}
exports.select = select;
function* cancelled() {
    return yield effects_1.cancelled();
}
exports.cancelled = cancelled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FnYUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaGVscGVycy9zYWdhSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGdEQVM0QjtBQVc1QixRQUFlLENBQUMsQ0FBQyxJQUFJLENBQ25CLE9BQTBCO0lBRTFCLE9BQU8sTUFBTSxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUpELG9CQUlDO0FBRUQsOERBQThEO0FBQzlELFFBQWUsQ0FBQyxDQUFDLElBQUksQ0FDbkIsRUFBTSxFQUNOLEdBQUcsSUFBb0I7SUFFdkIsT0FBTyxNQUFNLGNBQU8sQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBTEQsb0JBS0M7QUFFRCw4REFBOEQ7QUFDOUQsUUFBZSxDQUFDLENBQUMsSUFBSSxDQUNuQixFQUFNLEVBQ04sR0FBRyxJQUFvQjtJQUV2QixPQUFPLE1BQU0sY0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFMRCxvQkFLQztBQUVELDhEQUE4RDtBQUM5RCxRQUFlLENBQUMsQ0FBQyxNQUFNLENBRXJCLFFBQVksRUFBRSxHQUFHLElBQTBCO0lBQzNDLE9BQU8sTUFBTSxnQkFBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFKRCx3QkFJQztBQUVELFFBQWUsQ0FBQyxDQUFDLFNBQVM7SUFDeEIsT0FBTyxNQUFNLG1CQUFZLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRkQsOEJBRUMifQ==