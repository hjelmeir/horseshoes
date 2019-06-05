import { Event } from "electron";
import { Action, MiddlewareAPI } from "redux";

declare global {
  interface Window {
    ipc: Electron.IpcRenderer;
  }
}

export type IpcListener = (event: Event, type: string, payload: any) => Action;

export interface DispatchEvent {
  [key: string]: IpcListener;
}

export const ipcResourceHandler: IpcListener = (_, type, payload) => ({
  type,
  payload
});

export const ipcListeners = (events: DispatchEvent = {}) => {
  if (typeof events !== "object")
    throw new TypeError(
      `ipcDispatcher expects an events object as its first parameter, you passed type "${typeof events}"`
    );

  Object.keys(events).forEach(key => {
    if (typeof events[key] !== "function")
      throw new TypeError(
        `Each key in ipcDispatcher's must reference a dispatchable function, key "${key}" is of type "${typeof events[
          key
        ]}"`
      );
  });

  return ({ dispatch }: MiddlewareAPI) => {
    Object.keys(events).forEach(key => {
      window.ipc.on(key, (event: Electron.Event, payload: any) => {
        dispatch(events[key](event, key, payload));
      });
    });

    return (next: any) => (action: any) => next(action);
  };
};
