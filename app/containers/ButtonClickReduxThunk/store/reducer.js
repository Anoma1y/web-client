import { SET_COUNTER } from './types';
import type { ActionTypes } from './actions';

export type State = {
  clicks: number
}

const INITIAL_STATE: State = {
  clicks: 0
};

export default (state: State = INITIAL_STATE, action: ActionTypes): State => {
  switch (action.type) {
    case SET_COUNTER:
      return { ...state, clicks: action.payload };
    default:
      return state;
  }
};
