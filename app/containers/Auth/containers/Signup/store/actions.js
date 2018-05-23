import {
  CHANGE_LOGIN,
  CHANGE_ROLE,
  CHANGE_COUNTRY,
  CHANGE_OTP,
  SET_IS_PHONE,
  SET_IS_LOADING,
  SET_OTP_IS_SEND,
  SET_RESEND_OTP_BLOCKED,
  SET_ERROR,
  RESET
} from './types';
import { api } from 'lib/api';
import { checkIsPhone } from 'lib/auth';

export const changeLogin = (login) => ({
  type: CHANGE_LOGIN,
  payload: login
});

export const changeRole = (role) => ({
  type: CHANGE_ROLE,
  payload: role
});

export const setOtpIsSend = (isSend = false) => ({
  type: SET_OTP_IS_SEND,
  payload: isSend
});

export const changeOTP = (otp) => ({
  type: CHANGE_OTP,
  payload: otp
});

export const blockedResendOTP = (blocked = false) => ({
  type: SET_RESEND_OTP_BLOCKED,
  payload: blocked
});

export const changeCountry = (country) => ({
  type: CHANGE_COUNTRY,
  payload: country
});

export const setError = (error = false) => ({
  type: SET_ERROR,
  payload: error
});

export const setIsPhone = (isPhone = false) => ({
  type: SET_IS_PHONE,
  payload: isPhone
});

export const setIsLoading = (isLoading = false) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

export const reset = () => ({
  type: RESET
});

/**
 * Экшен для отправки логина (и страны)? и рендер новой формы для ввода OTP
 * В зависимости что было отправлено (почта или телефон) придет код
 * @returns {function(*, *)}
 */
export const getOTP = () => (dispatch, getState) => {

  const { login, role, country, isError } = getState().Auth_Signup;

  if (isError) {
    return;
  }
  dispatch(setIsLoading(true));

  // Отправка OTP на телефон или на почту
  if (checkIsPhone(login)) {
    const telephone = login.replace(/\+/g, '');
    dispatch(setIsPhone(true));
    api.auth.registration(telephone, role, country)
      .then((data) => {
        console.log(data)
        dispatch(setOtpIsSend(true));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        // TODO Добавить вывод ошибки
        dispatch(setIsLoading(false));
        console.log(error);
      });
  } else {
    dispatch(setIsPhone(false));
    const email = login.toLowerCase();
    api.auth.registration(email, role, country)
      .then((data) => {
        console.log(data)
        dispatch(setOtpIsSend(true));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setIsLoading(false));
        console.log(error);
      });
  }
};

/**
 * Экшен для повторной отправки ОТП
 * При активации экшена (в независимости от результата) блочиться кнопка повторной отправки
 * @returns {function(*, *)}
 */
export const resendOTP = () => (dispatch, getState) => {
  const { login, resendOTPIsBlocked, isError } = getState().Auth_Signup;

  dispatch(changeOTP(''));

  if (resendOTPIsBlocked || isError) {
    return;
  }

  dispatch(setIsLoading(true));
  api.auth.registrationResendOTP(login)
    .then((data) => {
      console.log(data)
      dispatch(blockedResendOTP(true));
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      dispatch(setIsLoading(false));
      console.log(error);
    });
};

/**
 * Экшен для отправки ОТП
 * @returns {function(*, *)}
 */
export const sendConfirm = () => (dispatch, getState) => {
  const { login, isError, OTP } = getState().Auth_Signup;

  if (isError) {
    return;
  }

  api.auth.registrationConfirm(login, OTP)
    // {"status":"ok","message":"processed successfully","action":"TOKEN_CREATED","authorizationToken":{"token":"5e706m9fnif6sr33cul0cc5pep","expiresAt":"2018-05-24T12:20:12.741Z"},"members":[{"role":"individual","user":{"id":"a4e75628-fc28-4bbf-94e7-768e41b5235f","name":""},"organization":{"id":"af638390-b2eb-4bb9-9fe2-11aa7758b0ae","type":"individual","name":""},"permissions":["CONTRACT_VIEWER","COIN_OWNER","COIN_VALIDATOR","TRANSFER_EXECUTOR","PREPAID_CREATION_EXECUTOR","PREPAID_REDEEM_EXECUTOR","CONTACT_VALIDATOR","ISSUER_VIEWER","CURRENCY_VIEWER","CASH_DESK_CLIENT","PROFILE_OWNER","PROFILE_DOCUMENTS_OWNER","SMART_CARD_OWNER","SMART_CARD_VALIDATOR","MASTER_PIN_OWNER","MEDIA_FILE_OWNER","BANK_WITHDRAWAL_CREATION_EXECUTOR","GATE_OPERATION_EXECUTOR","EXCHANGE_EXECUTOR","EXCHANGE_VIEWER","TRANSACTIONS_VIEWER","CONVERSATION_VIEWER","CONVERSATION_MESSAGE_CREATION_EXECUTOR","TICKET_OWNER","INVOICE_PAYER","PAYMENT_PAYER","POINT_OF_SALE_VIEWER","MERCHANT_PRODUCT_VIEWER","LOYALTY_RULE_VIEWER","TRANSACTIONS_CONFIRMATION_SETTINGS_OWNER","TRANSACTIONS_CONFIRMATION_EXECUTOR","PUSH_NOTIFICATION_SUBSCRIBER","TEMPLATES_OWNER"],"token":{"token":"5e706m9fnif6sr33cul0cc5pep","expiresAt":"2018-05-24T12:20:12.741Z"}}]}
    .then((data) => {
      console.log(data)
      dispatch(changeOTP(''));
      dispatch(setIsLoading(false));
    })

    .catch((error) => {
      dispatch(setIsLoading(false));
      console.log(error);
    });
};
