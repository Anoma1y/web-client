import {
  CHANGE_LOGIN,
  CHANGE_NEW_USER_PASSWORD,
  CHANGE_OTP,
  SET_ERROR,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  RESET,
} from './types';

const INITIAL_STATE = {
  OTP: '',
  login: 'ueuknjg@gmail.com',
  newUserPassword: '',
  isError: false,
  isPhone: false,
  isLoading: false,
  otpIsSend: true,
  resendOTPIsBlocked: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    case CHANGE_OTP:
      return { ...state, OTP: action.payload };
    case CHANGE_NEW_USER_PASSWORD:
      return { ...state, newUserPassword: action.payload };
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
