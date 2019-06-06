import { Event } from "electron";
import { Action, MiddlewareAPI, Middleware, Dispatch } from "redux";

declare global {
  interface Window {
    ipc: Electron.IpcRenderer;
  }
}

export type ipcDispatch = (event: Event, type: string, payload: any) => Action;

export interface IpcDispatchEvent {
  [key: string]: ipcDispatch;
}

export const ipcResourceHandler: ipcDispatch = (_, type, payload) => ({
  type,
  payload
});

export const ipcMiddleware = (
  events: IpcDispatchEvent = {}
): Middleware<{}, any, Dispatch> => {
  if (typeof events !== "object")
    throw new TypeError(
      `ipcListeners expects an events object as its first parameter, you passed type "${typeof events}"`
    );

  Object.keys(events).forEach(key => {
    if (typeof events[key] !== "function")
      throw new TypeError(
        `Each key in ipcListeners's must reference a dispatchable function, key "${key}" is of type "${typeof events[
          key
        ]}"`
      );
  });

  return ({ dispatch }: MiddlewareAPI) => {
    Object.keys(events).forEach(key => {
      window.ipc.on(key, (event: Electron.Event, payload: any) => {
        if (events[key]) dispatch(events[key](event, key, payload));
        else if (events["default"])
          dispatch(events["default"](event, key, payload));
        else dispatch(ipcResourceHandler(event, key, payload));
      });
    });

    return (next: any) => (action: any) => next(action);
  };
};
