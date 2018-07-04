import {
  CHANGE_LOGIN,
  CHANGE_NEW_USER_PASSWORD,
  CHANGE_OTP,
  SET_ERROR,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_RESEND_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_ERROR_MESSAGE,
  SET_RESEND_OTP_BLOCKED,
  SET_OTP_IS_BLOCK,
  RESET,
} from './types';

const INITIAL_STATE = {
  OTP: '',
  login: '',
  newUserPassword: '',
  isError: false,
  isPhone: false,
  isLoading: false,
  isLoadingResend: false,
  otpIsSend: false,
  resendOTPIsBlocked: false,
  otpIsBlock: false,
  errorMessage: ''
};

const HANDLERS = {
  [CHANGE_LOGIN]: (state, { payload }) => ({
    ...state,
    login: payload
  }),
  [CHANGE_OTP]: (state, { payload }) => ({
    ...state,
    OTP: payload
  }),
  [CHANGE_NEW_USER_PASSWORD]: (state, { payload }) => ({
    ...state,
    newUserPassword: payload
  }),
  [SET_IS_PHONE]: (state, { payload }) => ({
    ...state,
    isPhone: payload
  }),
  [SET_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  }),
  [SET_RESEND_IS_LOADING]: (state, { payload }) => ({
    ...state,
    isLoadingResend: payload
  }),
  [SET_ERROR]: (state, { payload }) => ({
    ...state,
    isError: payload
  }),
  [SET_OTP_IS_SEND]: (state, { payload }) => ({
    ...state,
    otpIsSend: payload
  }),
  [SET_ERROR_MESSAGE]: (state, { payload }) => ({
    ...state,
    errorMessage: payload
  }),
  [SET_RESEND_OTP_BLOCKED]: (state, { payload }) => ({
    ...state,
    resendOTPIsBlocked: payload
  }),
  [SET_OTP_IS_BLOCK]: (state, { payload }) => ({
    ...state,
    otpIsBlock: payload
  }),
  [RESET]: (state ) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
