const EMAIL_VALIDATION_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_VALIDATION_PATTERN = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/; // TEST

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
