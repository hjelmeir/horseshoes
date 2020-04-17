import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';

declare global {
  interface Window {
    readonly ipc: Electron.IpcRenderer;
  }
}

export type ipcDispatch = (event: Event, type: string, payload: any) => Action;

export interface IpcDispatchEvent {
  readonly [key: string]: ipcDispatch;
}

export const ipcResourceHandler: ipcDispatch = (_, type, payload) => ({
  type,
  payload,
});

export const createIpcMiddleware = (
  renderer: Electron.IpcRenderer,
  events: IpcDispatchEvent = {}
): Middleware<{}, any, Dispatch> => {
  if (typeof events !== 'object') {
    throw new TypeError(
      `ipcListeners expects an events object as its first parameter, you passed type "${typeof events}"`
    );
  }

  Object.keys(events).forEach((key) => {
    if (typeof events[key] !== 'function') {
      throw new TypeError(
        `Each key in ipcListeners's must reference a dispatchable function, key "${key}" is of type "${typeof events[
          key
        ]}"`
      );
    }
  });

  return ({ dispatch }: MiddlewareAPI) => {
    Object.keys(events).forEach((key) => {
      renderer.on(key, (event: Event, payload: any) => {
        dispatch(events[key](event, key, payload));
      });
    });

    return (next: any) => (action: any) => next(action);
  };
};
