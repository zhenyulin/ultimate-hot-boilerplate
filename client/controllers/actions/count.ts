import { Action } from 'controllers/types/action';

export const ADD: string = 'count:ADD';

export default {
  add: (): Action<void> => ({ type: ADD  }),
};
