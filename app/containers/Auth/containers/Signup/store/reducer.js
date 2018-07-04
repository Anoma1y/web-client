import {
  CHANGE_LOGIN,
  CHANGE_COUNTRY,
  CHANGE_ROLE,
  CHANGE_OTP,
  SET_IS_LOADING,
  SET_RESEND_IS_LOADING,
  SET_IS_PHONE,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  SET_OTP_IS_BLOCK,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  RESET
} from './types';

const INITIAL_STATE = {
  login: '',
  country: '',
  OTP: '',
  role: 'individual',
  isError: false,
  isPhone: false,
  isLoading: false,
  isLoadingResend: false,
  otpIsSend: false,
  otpIsBlock: false,
  resendOTPIsBlocked: false,
  errorMessage: ''
};

const HANDLERS = {
  [CHANGE_LOGIN]: (state, { payload }) => ({
    ...state,
    login: payload
  }),
  [CHANGE_ROLE]: (state, { payload }) => ({
    ...state,
    role: payload
  }),
  [CHANGE_COUNTRY]: (state, { payload }) => ({
    ...state,
    country: payload
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
  [SET_OTP_IS_BLOCK]: (state, { payload }) => ({
    ...state,
    otpIsBlock: payload
  }),
  [CHANGE_OTP]: (state, { payload }) => ({
    ...state,
    OTP: payload
  }),
  [SET_RESEND_OTP_BLOCKED]: (state, { payload }) => ({
    ...state,
    resendOTPIsBlocked: payload
  }),
  [SET_ERROR_MESSAGE]: (state, { payload }) => ({
    ...state,
    errorMessage: payload
  }),
  [RESET]: (state) => ({
    ...state,
    ...INITIAL_STATE
  }),
}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
