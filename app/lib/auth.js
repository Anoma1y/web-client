/**
 * Функция для проверки логина (телефон или почта) и преобразование его в нужный формат
 * Если телефон - "+ ........."
 * Если почта то обычный текст
 * @param val
 */
export const transformLoginType = (val) => {
  let login = val;

  const testVal = /^[0-9+][^a-zA-Z@_.+-]*$/.test(val);
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
