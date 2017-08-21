import { Map } from 'immutable';
import { addCount } from '../count';

describe('addCount', () => {
  it('adds', () => {
    const state: Map<string, any> = Map({
      current: 0
    });
    const newState: Map<string, any> = addCount(state);
    expect(newState.get('current')).toEqual(1);
  });
});
