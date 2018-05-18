import {
  CHANGE_LOGIN
} from './types';

// Auth_Signup
const INITIAL_STATE = {
  login: '',
  country: '',
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    default:
      return state;
  }
};
