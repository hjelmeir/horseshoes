import { Action } from 'redux';
import { ActionPattern, Effect, Tail } from 'redux-saga/effects';
export declare type SagaIterator<RT = any> = Generator<Effect<any>, RT, any>;
export declare type CallResult<RT> = RT extends SagaIterator<infer A> ? A : RT extends Promise<infer B> ? B : RT;
export declare function take<A extends Action>(pattern?: ActionPattern<A>): SagaIterator<A>;
export declare function call<Fn extends (...args: readonly any[]) => any>(fn: Fn, ...args: Parameters<Fn>): SagaIterator<CallResult<ReturnType<Fn>>>;
export declare function fork<Fn extends (...args: readonly any[]) => any>(fn: Fn, ...args: Parameters<Fn>): SagaIterator<CallResult<ReturnType<Fn>>>;
export declare function select<Fn extends (state: any, ...args: readonly any[]) => any>(selector: Fn, ...args: Tail<Parameters<Fn>>): SagaIterator<ReturnType<Fn>>;
export declare function cancelled(): SagaIterator<boolean>;
