import { createResource, deleteResource, initResources } from "../helpers";
import { ALERT, Alert, AlertAction, Resources } from "../models";

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = (payload: Alert): AlertAction => ({
  type: ALERT.CREATE,
  payload
});

/**
 * Dismiss an alert
 */
export const deleteAlert = (payload: Alert): AlertAction => ({
  type: ALERT.DELETE,
  payload
});

export const alertReducer = (
  state: Resources<Alert>,
  action: AlertAction
): Resources<Alert> => {
  if (state === undefined) return initResources<Alert>();

  const { type, payload } = action;

  switch (type) {
    case ALERT.CREATE:
      return createResource<Alert>(state, payload);

    case ALERT.DELETE:
      return deleteResource<Alert>(state, payload);

    default:
      return state;
  }
};
