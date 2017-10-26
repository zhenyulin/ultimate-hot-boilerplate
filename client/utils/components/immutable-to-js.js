import React from 'react';
import { Iterable } from 'immutable';

export default Component => props => {
  const KEY = 0;
  const VALUE = 1;

  const propsInJS = Object.entries(props).reduce(
    (newProps, prop) => ({
      ...newProps,
      [prop[KEY]]: Iterable.isIterable(prop[VALUE])
        ? prop[VALUE].toJS()
        : prop[VALUE],
    }),
    {},
  );

  return <Component {...propsInJS} />;
};
