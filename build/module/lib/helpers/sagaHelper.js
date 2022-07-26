import { call as rawCall, cancelled as rawCancelled, fork as rawFork, select as rawSelect, take as rawTake, } from 'redux-saga/effects';
export function* take(pattern) {
    return yield rawTake(pattern);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* call(fn, ...args) {
    return yield rawCall(fn, ...args);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* fork(fn, ...args) {
    return yield rawFork(fn, ...args);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* select(selector, ...args) {
    return yield rawSelect(selector, ...args);
}
export function* cancelled() {
    return yield rawCancelled();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FnYUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaGVscGVycy9zYWdhSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFFTCxJQUFJLElBQUksT0FBTyxFQUNmLFNBQVMsSUFBSSxZQUFZLEVBRXpCLElBQUksSUFBSSxPQUFPLEVBQ2YsTUFBTSxJQUFJLFNBQVMsRUFFbkIsSUFBSSxJQUFJLE9BQU8sR0FDaEIsTUFBTSxvQkFBb0IsQ0FBQztBQVc1QixNQUFNLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDbkIsT0FBMEI7SUFFMUIsT0FBTyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsOERBQThEO0FBQzlELE1BQU0sU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNuQixFQUFNLEVBQ04sR0FBRyxJQUFvQjtJQUV2QixPQUFPLE1BQU0sT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCw4REFBOEQ7QUFDOUQsTUFBTSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ25CLEVBQU0sRUFDTixHQUFHLElBQW9CO0lBRXZCLE9BQU8sTUFBTSxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVELDhEQUE4RDtBQUM5RCxNQUFNLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FFckIsUUFBWSxFQUFFLEdBQUcsSUFBMEI7SUFDM0MsT0FBTyxNQUFNLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxTQUFTLENBQUMsQ0FBQyxTQUFTO0lBQ3hCLE9BQU8sTUFBTSxZQUFZLEVBQUUsQ0FBQztBQUM5QixDQUFDIn0=