import {
  SET_PROFILE,
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  RESET,
} from './types';

const INITIAL_STATE = {
  profile: {},
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
    case SET_OTP_IS_SEND:
      return { ...state, otpIsSend: { ...state.otpIsSend, [action.contactType]: action.payload } };
    case SET_OTP_IS_BLOCKED:
      return { ...state, resendOTPIsBlocked: { ...state.resendOTPIsBlocked, [action.contactType]: action.payload } };
    case RESET:
      return { ...state, resendOTPIsBlocked: INITIAL_STATE.resendOTPIsBlocked, otpIsSend: INITIAL_STATE.otpIsSend };
    default:
      return state;
  }
}
