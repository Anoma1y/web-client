import {
  CHANGE_LOGIN,
  SET_IS_PHONE,
  SET_IS_LOADING,
  CHANGE_OTP,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  RESET,
  SET_ERROR
} from './types';

const INITIAL_STATE = {
  OTP: '',
  login: '',
  isError: false,
  isPhone: false,
  isLoading: false,
  otpIsSend: false,
  resendOTPIsBlocked: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    case CHANGE_OTP:
      return { ...state, OTP: action.payload };
    case SET_IS_PHONE:
      return { ...state, isPhone: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, isError: action.payload };
    case SET_OTP_IS_SEND:
      return { ...state, otpIsSend: action.payload };
    case SET_RESEND_OTP_BLOCKED:
      return { ...state, resendOTPIsBlocked: action.payload };
    case RESET:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
}
