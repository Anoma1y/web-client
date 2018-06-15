import {
  pullCoins,
  pullProfile,
  pullThirdPartyCards,
  pullCards
} from '../containers/Sidebar/store/actions';
import Storage from 'lib/storage';

const ROLES = {
  individual: [pullCoins, pullProfile, pullThirdPartyCards, pullCards],
  merchant: [pullCoins, pullProfile],
  administrator: [pullProfile],
  byDefault: [pullProfile]
};

/**
 * Функция для инициализации роли и вызова функции init()
 * @returns {function(*=)}
 */
export const initialData = () => (dispatch) => {
  const { role } = Storage.get('members')[0];
  const currentRoleInitialActions = ROLES[role] || ROLES.byDefault;

  return Promise.all(currentRoleInitialActions.map((action) => {
    return dispatch(action());
  }));
};
