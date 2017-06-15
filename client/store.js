import { createStore } from 'redux';
import reducer from 'reducer';

export default function setupStore() {
  return createStore(reducer);
}
