// @flow
import type { Map } from 'immutable';

export type Router = {
  location: {
    pathname: String,
    search: String,
    hash: String,
    key: String,
  },
};

export type Count = Map<string, any>;

export type Event = Map<string, any>;

export type State = {
  router: Router,
  count: Count,
  event: Event,
};
