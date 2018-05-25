import {
  SET_PROFILE_INFO
} from './types';

const INITIAL_STATE = {
  profile: {

  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}
