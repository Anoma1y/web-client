import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  CHANGE_OTP,
  SET_IS_LOADING,
  SET_IS_PHONE,
  SET_IS_BLOCKED,
  SET_ERROR_MESSAGE,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  SET_OTP_IS_BLOCK,
  SET_ERROR,
} from './types';

// Auth_Signup
const INITIAL_STATE = {
  login: '',
  password: '',
  OTP: '',
  isError: false,
  isPhone: false,
  isLoading: false,
  isBlocked: false,
  otpIsSend: false,
  otpIsBlock: false,
  resendOTPIsBlocked: false,
  errorMessage: ''
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
    case SET_OTP_IS_SEND:
      return { ...state, otpIsSend: action.payload };
    case SET_OTP_IS_BLOCK:
      return { ...state, otpIsBlock: action };
    case CHANGE_OTP:
      return { ...state, OTP: action.payload };
    case SET_RESEND_OTP_BLOCKED:
      return { ...state, resendOTPIsBlocked: action.payload };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case SET_ERROR:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};
