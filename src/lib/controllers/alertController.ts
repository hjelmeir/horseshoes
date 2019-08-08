import { createResource, deleteResource, initResources } from "../helpers";
import { ALERTS, ALERT, Alert, AlertAction, defaultAlert, Resources } from "../models";

/**
 * Publish an alert
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

export const deleteAlerts = ():  AlertAction => ({
  type: ALERTS.DELETE
})

export const alertReducer = (
  state: Resources<Alert> = initResources<Alert>(),
  { type, payload }: AlertAction
): Resources<Alert> => {

  if (!type || !payload) return state

  switch (type) {
    case ALERTS.DELETE:
      return initResources<Alert>();

    case ALERT.CREATE:
      return createResource<Alert>(state, payload, defaultAlert);

    case ALERT.DELETE:
      return deleteResource<Alert>(state, payload);

    default:
      return state;
  }
};
