import { Resources, Resource } from "../models/resource";

export function toArray<M extends Resource>(resources: Resources<M>): M[] {
  return resources.keys.map((key: string): M => resources.data[key]);
}
