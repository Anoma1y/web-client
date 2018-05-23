const EMAIL_VALIDATION_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_VALIDATION_PATTERN = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/; // TEST
const PASSWORD_VALIDATION_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/;

/**
 * Функция для проверки правильности ввода почты
 * @param val - почта
 * @returns {boolean}
 */
export const validationEmail = (val) => {
  return EMAIL_VALIDATION_PATTERN.test(val);
};

/**
 * Функция для проверки номера телефона в международном формате
 * @param val - номер телефона
 * @returns {boolean}
 */
export const validationPhone = (val) => {
  return PHONE_VALIDATION_PATTERN.test(val);
};

/**
 * Функция для проверки пароля
 * Пароль должен содержать как минимум 1 прописную букву, 1 цифру, 1 знак препинания и иметь длину более 8 символов
 * @param val - пароль
 * @returns {boolean}
 */
export const validationPassword = (val) => {
  return PASSWORD_VALIDATION_PATTERN.test(val);
};

/**
 * Функция для быстрой првоерки логина на тип (почта или телефон)
 * @param val - значение
 * @returns {boolean}
 */
export const checkIsPhone = (val) => {
  return /^[0-9+][^a-zA-Z@_.+-]*$/.test(val);
};

/**
 * Функция для проверки логина (телефон или почта) и преобразование его в нужный формат
 * Если телефон - "+ ........."
 * Если почта то обычный текст
 * @param val
 */
export const transformLoginType = (val) => {
  let login = val;

  const testVal = checkIsPhone(val);
  if (val.length !== 0) {
    if (testVal) {
      if (!/^\+\d|^\+/.test(val)) {
        login = `+${val}`;
      }
    } else {
      login = val.replace(/\+/g, '');
    }
  }

  return login.trim();
};

/**
 * Функция проверки логина (почты или телефона)
 * @param val - логин
 * @param maxLength - максимальная длина почты
 * @returns {*} error - булевое значение ошибки, errorText - текст ошибки
 */
export const validateLogin = (val, maxLength = 64) => {

  if (val.length === 0) {
    return {
      error: true,
      errorText: ''
    };
  }

  if (val.length > maxLength) {
    return {
      error: true,
      errorText: `Email should not be more than ${maxLength} characters`
    };
  }

  if (checkIsPhone(val)) {
    const err = !validationPhone(val);
    return {
      error: err,
      errorText: err ? 'Please enter a valid phone number' : ''
    };
  } else {
    const err = !validationEmail(val);
    return {
      error: err,
      errorText: err ? 'Please enter a valid Email' : ''
    };
  }

  return {
    error: false,
    errorText: ''
  };
};

/**
 * Функция проверки пароля
 * @param val - пароль
 * @param minLenght - минимальная длина пароля
 * @returns {*} error - булевое значение ошибки, errorText - текст ошибки
 */
export const validatePassword = (val, minLenght = 8) => {
  if (val.length === 0) {
    return {
      error: true,
      errorText: ''
    };
  }

  if (val.length < minLenght) {
    return {
      error: true,
      errorText: `Password must be longer than ${minLenght} characters`
    };
  }

  if (!validationPassword(val)) {
    return {
      error: true,
      errorText: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    };
  }
  return {
    error: false,
    errorText: ''
  };
};

/**
 * Функция для проверки ОТП
 * @param val - ОТП
 * @param maxLength - максимальная длина
 * @returns {*} error - булевое значение ошибки, errorText - текст ошибки
 */
export const validateOTP = (val, maxLength = 32) => {

  if (val.length === 0) {
    return {
      error: true,
      errorText: ''
    };
  }

  if (maxLength !== null && val.length > maxLength) {
    return {
      error: true,
      errorText: `OTP can not be longer than ${maxLength} characters`
    };
  }

  return {
    error: false,
    errorText: ''
  };

};
