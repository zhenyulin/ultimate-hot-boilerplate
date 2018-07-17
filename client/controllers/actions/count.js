import { defaultActionBundle } from 'utils/action-manager';

export const [ADD, add] = defaultActionBundle('@count/ADD');

export const COUNT = {
  ADD,
};

export const countActions = {
  add,
};
