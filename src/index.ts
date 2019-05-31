import { union, merge } from 'lodash'

export interface Resource {
  key: string
}

export interface Resources<Models> {
  isLoading: boolean
  keys: string[]
  data: {
    [key: string]: Models
  }
}

export interface HorshoeAction<M> {
  type: string
  payload?: Resources<M> | M
}

export const defaultResources: Resources<any> = {
  isLoading: false,
  keys: [],
  data: {}
}

//
// Helpers
//
export function createResource<M extends Resource>(state: Resources<M>, payload?: M, defaultResource?: M): Resources<M> {
  if (!payload) return state

  let newState = { ...state }
  newState.keys = union(newState.keys, [payload.key])
  newState.data[payload.key] = merge(newState.data[payload.key], defaultResource, payload)

  return newState as Resources<M>
}

export function deleteResource<M extends Resource>(state: Resources<M>, payload?: M): Resources<M> {
  if (!payload) return state

  let newState = { ...state }
  newState.keys = newState.keys.filter((key: string) => key !== payload.key)
  delete newState.data[payload.key]

  return newState as Resources<M>
}

export const toArray = (resources: Resources<any>): Resource[] => {
  return resources.keys.map((key: string): Resource => resources.data[key])
}
