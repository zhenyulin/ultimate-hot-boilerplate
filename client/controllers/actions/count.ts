import { IAction } from '../types/action';

export const ADD: string = 'count:ADD';

export default {
  add: (): IAction<void> => ({ type: ADD  }),
};
