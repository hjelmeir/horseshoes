import { Resource } from './resource';
export declare enum ALERT {
    CREATE = "horseshoes/alert/create",
    DELETE = "horseshoes/alert/delete"
}
export declare enum ALERTS {
    DELETE = "horseshoes/alerts/DELETE"
}
export interface Alert extends Resource {
    readonly key: string;
    readonly status: 'success' | 'warning' | 'error' | 'generic';
    readonly message: string | readonly string[];
    readonly dismissable?: boolean;
    readonly dismissAfter?: number;
}
export interface AlertAction {
    readonly type: ALERT | ALERTS;
    readonly payload?: Alert;
}
export declare const defaultAlert: Alert;
