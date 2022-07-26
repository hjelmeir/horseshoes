import { Alert, AlertAction, Resources } from '../models';
/**
 * Publish an alert
 */
export declare const createAlert: (payload: Alert) => AlertAction;
/**
 * Dismiss an alert
 */
export declare const deleteAlert: (payload: Alert) => AlertAction;
export declare const deleteAlerts: () => AlertAction;
export declare const alertReducer: (state: Resources<Alert> | undefined, { type, payload }: AlertAction) => Resources<Alert>;
