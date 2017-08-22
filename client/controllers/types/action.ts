export type ActionName = string;

export interface IAction<T> {
  type: ActionName,
  payload?: T
}

export type Action<T> = IAction<T>;

export type ActionCreator = <T>(payload?: T) => Action<T>;
