import {
  SET_PROFILE,
  CHANGE_OTP,
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  RESET,
} from './types';

const INITIAL_STATE = {
  profile: {},
  isLoading: {},
  otp: {
    phoneNumber: '',
    email: ''
  },
  otpIsSend: {
    phoneNumber: true,
    email: false
  },
  resendOTPIsBlocked: {
    phoneNumber: false,
    email: false
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    case CHANGE_OTP:
      return { ...state, otp: { ...state.otp, [action.payload.contactType]: action.payload.value } };
    case SET_OTP_IS_SEND:
      return { ...state, otpIsSend: { ...state.otpIsSend, [action.payload.contactType]: action.payload.otpIsSend } };
    case SET_OTP_IS_BLOCKED:
      return { ...state, resendOTPIsBlocked: { ...state.resendOTPIsBlocked, [action.payload.contactType]: action.payload.otp } };
    case RESET:
      return { ...state, resendOTPIsBlocked: INITIAL_STATE.resendOTPIsBlocked, otpIsSend: INITIAL_STATE.otpIsSend };
    default:
      return state;
  }
}
