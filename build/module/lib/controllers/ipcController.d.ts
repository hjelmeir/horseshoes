import { Action, Dispatch, Middleware } from 'redux';
import { IpcRenderer } from 'electron';
declare global {
    interface Window {
        readonly ipc: IpcRenderer;
    }
}
export declare type ipcDispatch = (event: Event, type: string, payload: any) => Action;
export interface IpcDispatchEvent {
    readonly [key: string]: ipcDispatch;
}
export declare const ipcResourceHandler: ipcDispatch;
export declare const createIpcMiddleware: (renderer: IpcRenderer, events?: IpcDispatchEvent) => Middleware<{}, any, Dispatch>;
