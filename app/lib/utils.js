/**
 * Функция для генерация кэша из строки
 * @param string - строка
 */
export const genHash = (string) => string.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);

/**
 * Функция для вывода всех значений объекта и вложенных в данный объект объектов
 * @param object - объект для вычисления
 * @returns {Array}
 */
export const getValuesDeep = (object) => {
  const arr = [];
  const getVal = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        getVal(obj[key]);
      } else {
        arr.push(obj[key]);
      }
    }
  }
  getVal(object);
  return arr;
};

/**
 * Функция для получения имени пользователя
 * @param profile - объект profile, получаемый после авторизации
 * @returns {*}
 */
export const getUserName = (profile) => {

  if (profile.person) {
    const { nameIntl, namePlain } = profile.person;

    if (nameIntl.first && nameIntl.last) {
      return `${nameIntl.first} ${nameIntl.last}`;
    } else if (namePlain.first && namePlain.last) {
      return `${namePlain.first} ${namePlain.last}`;
    }
  }

  if (profile.contact) {
    const { contact } = profile;
    return contact.email || contact.phoneNumber;
  }

  return 'User';
};

const roles = {
  administrator: 'Administrator',
  merchant: 'Merchant user',
  individual: 'Individual user'
};

export const getUserRole = (role) => roles[role] || 'Individual user';

/**
 * Функция для преобразования base64 в формат file
 * @param base64 - код base64
 * @param filename - название файла
 * @returns {File}
 */
export const dataURLtoFile = (base64, filename) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
