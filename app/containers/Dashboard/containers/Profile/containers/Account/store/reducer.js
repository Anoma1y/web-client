import {
  SET_OTP_IS_SEND,
  SET_OTP_IS_BLOCKED,
  SET_OTP_IS_LOADING,
  RESET,
} from './types';

const INITIAL_STATE = {
  otpIsSend: {
    phoneNumber: false,
    email: false
  },
  resendOTPIsBlocked: {
    phoneNumber: false,
    email: false
  },
  otpIsLoading: {
    phoneNumber: false,
    email: false
  }
};

const HANDLERS = {
  [SET_OTP_IS_SEND]: (state, { payload }) => ({
    ...state,
    otpIsSend: {
      ...state.otpIsSend,
      [payload.contactType]: payload.otpIsSend
    }
  }),
  [SET_OTP_IS_BLOCKED]: (state, { payload }) => ({
    ...state,
    resendOTPIsBlocked: {
      ...state.resendOTPIsBlocked,
      [payload.contactType]: payload.blocked
    }
  }),
  [SET_OTP_IS_LOADING]: (state, { payload }) => ({
    ...state,
    otpIsLoading: {
      ...state.otpIsLoading,
      [payload.contactType]: payload.otp
    }
  }),
  [RESET]: (state) => ({
    ...state,
    resendOTPIsBlocked: INITIAL_STATE.resendOTPIsBlocked,
    otpIsSend: INITIAL_STATE.otpIsSend
  }),

};

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
