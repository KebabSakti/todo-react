export enum RequestState {
  idle = "idle",
  loading = "loading",
  complete = "complete",
}

export interface RequestResult<T> {
  list: Array<T>;
  detail?: T;
  state: RequestState;
  error?: Error;
}

export interface ComponentProp<T> {
  prop?: T;
}
