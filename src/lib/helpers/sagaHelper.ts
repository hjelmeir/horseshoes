import { Action } from 'redux';
import {
  ActionPattern,
  call as rawCall,
  cancelled as rawCancelled,
  Effect,
  fork as rawFork,
  select as rawSelect,
  Tail,
  take as rawTake,
} from 'redux-saga/effects';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SagaIterator<RT = any> = Generator<Effect<any>, RT, any>;

export type CallResult<RT> = RT extends SagaIterator<infer A>
  ? A
  : RT extends Promise<infer B>
  ? B
  : RT;

export function* take<A extends Action>(
  pattern?: ActionPattern<A>
): SagaIterator<A> {
  return yield rawTake(pattern);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* call<Fn extends (...args: readonly any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaIterator<CallResult<ReturnType<Fn>>> {
  return yield rawCall(fn, ...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* fork<Fn extends (...args: readonly any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaIterator<CallResult<ReturnType<Fn>>> {
  return yield rawFork(fn, ...args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* select<
  Fn extends (state: any, ...args: readonly any[]) => any
>(selector: Fn, ...args: Tail<Parameters<Fn>>): SagaIterator<ReturnType<Fn>> {
  return yield rawSelect(selector, ...args);
}

export function* cancelled(): SagaIterator<boolean> {
  return yield rawCancelled();
}
