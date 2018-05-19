import {
  CHANGE_LOGIN,
  CHANGE_COUNTRY,
  CHANGE_ROLE,
  CHANGE_OTP,
  SET_IS_LOADING,
  SET_IS_PHONE,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  SET_ERROR,
} from './types';

// Auth_Signup
const INITIAL_STATE = {
  login: '',
  country: '',
  OTP: '',
  role: 'individual',
  isError: false,
  isPhone: false,
  isLoading: false,
  otpIsSend: true,
  resendOTPIsBlocked: false, // TODO добавить таймер
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    case CHANGE_ROLE:
      return { ...state, role: action.payload };
    case CHANGE_COUNTRY:
      return { ...state, country: action.payload };
    case SET_IS_PHONE:
      return { ...state, isPhone: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, isError: action.payload };
    case SET_OTP_IS_SEND:
      return { ...state, otpIsSend: action.payload };
    case CHANGE_OTP:
      return { ...state, OTP: action.payload };
    case SET_RESEND_OTP_BLOCKED:
      return { ...state, resendOTPIsBlocked: action.payload };
    default:
      return state;
  }
};
