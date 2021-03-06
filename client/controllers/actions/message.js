// @flow

import { EventTypes } from 'redux-segment';

import {
  asyncActionNames,
  defaultAsyncActions,
  asyncActionBundle,
  actionBundle,
} from 'utils/action-manager';

export const [ASYNC_TEST, asyncTestActions] = asyncActionBundle(
  '@event/ASYNC_TEST',
);
export const [TEST, testAction] = actionBundle('@event/TEST');

export const MESSAGE = asyncActionNames('@event/MESSAGE');
export const messageActions = {
  ...defaultAsyncActions(MESSAGE),
  post: data => ({
    type: MESSAGE.POST,
    payload: data,
    meta: {
      analytics: [
        {
          eventType: EventTypes.track,
          eventPayload: {
            event: MESSAGE.POST,
          },
        },
      ],
    },
  }),
};
