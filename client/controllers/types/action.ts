export interface IAction<T> {
  type: string,
  payload?: T
}

export type ActionCreator<T> = (payload?: T) => IAction<T>
