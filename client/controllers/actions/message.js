// @flow

import { EventTypes } from 'redux-segment';

import {
  defaultAsyncActionNames,
  defaultAsyncActions,
} from 'utils/action-manager';

export const MESSAGE = defaultAsyncActionNames('@MESSAGE');
export const messageActions = {
  ...defaultAsyncActions(MESSAGE),
  create: data => ({
    type: MESSAGE.CREATE,
    payload: data,
    meta: {
      analytics: [
        {
          eventType: EventTypes.track,
          eventPayload: {
            event: MESSAGE.CREATE,
          },
        },
      ],
    },
  }),
};
