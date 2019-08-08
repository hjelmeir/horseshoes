import { Resource } from "./resource";

//
// Types
//
export enum ALERT {
  CREATE = "app/alert/CREATE_ALERT",
  DELETE = "app/alert/DELETE_ALERT"
}

export interface Alert extends Resource {
  key: string;
  status: "success" | "warning" | "error" | "generic";
  message: string;
  dismissable?: boolean;
  dismissAfter?: number;
}

export interface AlertAction {
  readonly type: ALERT;
  readonly payload?: Alert;
}
