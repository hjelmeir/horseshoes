import { Resource } from './resource';

//
// Types
//
export enum ALERT {
  CREATE = 'horseshoes/alert/create',
  DELETE = 'horseshoes/alert/delete',
}

export enum ALERTS {
  DELETE = 'horseshoes/alerts/DELETE',
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

//
// Data
//
export const defaultAlert: Alert = {
  key: 'alert',
  status: 'generic',
  message: 'No message',
  dismissable: true,
  dismissAfter: 3000,
};
