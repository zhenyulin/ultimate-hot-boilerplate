import { actionBundle } from 'utils/action-manager';

export const [ADD, add] = actionBundle('@count/ADD');

export const COUNT = {
  ADD,
};

export const countActions = {
  add,
};
