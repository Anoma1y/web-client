import {
  pullCoins,
  pullProfile,
  pullIssuers,
} from '../containers/Sidebar/store/actions';
import Storage from 'lib/storage';

const individual = [pullCoins, pullProfile, pullIssuers];
const merchant = [pullCoins, pullProfile];
const administrator = [pullProfile];

/**
 * Функия для определения роли и вызова массива функций для определенной роли
 * @param role - роль
 * @param dispatch
 * @returns {Promise<[*]>}
 */
const init = (role, dispatch) => {
  let actions = [];

  switch (role) {
    case 'merchant':
      actions = merchant;
      break;
    case 'administrator':
      actions = administrator;
      break;
    default:
      actions = individual;
  }

  return Promise.all(actions.map((action) => {
    return dispatch(action());
  }));
};

/**
 * Функция для инициализации роли и вызова функции init()
 * @returns {function(*=)}
 */
export const initialData = () => (dispatch) => {
  const { role } = Storage.get('members')[0];

  return init(role, dispatch);
};
