import { INCREASE_COUNTER } from './types';
import type { ActionTypes } from './actions';

export type State = {
  clicks: number
}

const INITIAL_STATE: State = {
  clicks: 0
};

export default (state: State = INITIAL_STATE, action: ActionTypes): State => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return { ...state, clicks: state.clicks + 1 };
    default:
      return state;
  }
};
