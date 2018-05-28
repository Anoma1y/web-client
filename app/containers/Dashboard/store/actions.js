import {
  pullCoins,
  pullProfile,
  pullCards
} from '../containers/Sidebar/store/actions';
// import { pullTransactions } from '../containers/Transaction/store/actions';
import Storage from 'lib/storage';

// pullTransactions
const individual = [pullCoins, pullProfile, pullCards];
const merchant = [pullCoins, pullProfile, pullCards];
const administrator = [pullProfile];

/**
 * Функия для определения роли и вызова массива функций для определенной роли
 * @param role
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
