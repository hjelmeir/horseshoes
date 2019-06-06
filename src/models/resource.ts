export interface Resource {
  [key: string]: any;
  key: string;
}

export interface Resources<M> {
  keys: string[];
  data: {
    [key: string]: M;
  };
}

export interface ResourceAction<M> {
  type: string;
  payload?: M;
}

export interface ResourcesAction<M> {
  type: string;
  payload?: Resources<M>;
}
