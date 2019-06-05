import * as model from "./models/resource";
import * as helper from "./helpers/resourceHelper";

export { model, helper };

export const defaultResources = {
  isLoading: false,
  keys: [],
  data: {}
};

export function initResources<M extends model.Resource>(
  data?: model.Resources<M>
): model.Resources<M> {
  return {
    ...defaultResources,
    ...data
  };
}
