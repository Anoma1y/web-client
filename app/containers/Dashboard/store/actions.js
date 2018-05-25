import {
  pullCoins,
  pullProfile,
  pullCards
} from '../containers/Sidebar/store/actions';
import { pullTransactions } from '../containers/Transaction/store/actions';

/**
 * Первичная инициализация данных
 * @returns {function(*, *): Promise<[]>}
 */
export const initialData = () => (dispatch) => Promise.all([
  dispatch(pullCoins()),
  dispatch(pullProfile()),
  dispatch(pullCards()),
  dispatch(pullTransactions())
]);
