import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SET_IS_LOADING,
  SET_IS_PHONE,
  SET_IS_BLOCKED,
  SET_BLOCKED_TIME,
  SET_ERROR,
} from './types';

// Auth_Signup
const INITIAL_STATE = {
  login: '',
  password: '',
  isError: false,
  isPhone: false,
  isLoading: false,
  isBlocked: false,
  blockedTime: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, password: action.payload };
    case SET_IS_PHONE:
      return { ...state, isPhone: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_IS_BLOCKED:
      return { ...state, isBlocked: action.payload };
    case SET_BLOCKED_TIME:
      return { ...state, blockedTime: action.payload };
    case SET_ERROR:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};
