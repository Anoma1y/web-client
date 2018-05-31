import {
  SET_SESSION_LIST
} from './types';

const INITIAL_STATE = {
  session: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SESSION_LIST:
      return { ...state, session: action.payload };
    default:
      return state;
  }
}
