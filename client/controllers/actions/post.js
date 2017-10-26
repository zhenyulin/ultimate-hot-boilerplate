import { asyncActionBundle } from 'utils/action-manager';

export const [POST, postActions] = asyncActionBundle('@event/POST');

export default {
  POST,
  postActions,
};
