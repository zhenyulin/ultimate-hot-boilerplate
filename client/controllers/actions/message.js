export const GET_MESSAGE = '@event/GET_MESSAGE';
export const GET_MESSAGE_SUCCESS = '@event/GET_MESSAGE_SUCCESS';
export const GET_MESSAGE_FAIL = '@event/GET_MESSAGE_FAIL';

export const getMessage = () => ({
  type: GET_MESSAGE,
});

export const getMessageSuccess = data => ({
  type: GET_MESSAGE_SUCCESS,
  payload: data,
});

export const getMessageFail = err => ({
  type: GET_MESSAGE_FAIL,
  payload: err,
});

export default {
  getMessage,
  getMessageSuccess,
  getMessageFail,
};
