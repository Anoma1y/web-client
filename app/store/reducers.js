import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import AutoReducers from './_reducers';

export const RESET_ALL = 'RESET_ALL';

const appReducer = combineReducers({
  form: reduxFormReducer,
  routing: routerReducer,
  ...AutoReducers
});

const reducer = (state, action) => {
  switch (action.type) {
    case RESET_ALL:
      const resetStore = {
        ...state,
        Auth_Reset: undefined,
        Auth_Signin: undefined,
        Auth_Signup: undefined,
        Dashboard: undefined,
        AddProduct_Wallet: undefined,
        Dashboard_Card: undefined,
        Card_TopUp: undefined,
        Dashboard_Profile: undefined,
        Profile_Account: undefined,
        Profile_Security: undefined,
        Profile_Verification: undefined,
        Dashboard_Sidebar: undefined,
        Dashboard_Transaction: undefined,
        Dashboard_Wallet: undefined,
        Wallet_Exchange: undefined,
      }
      return appReducer(state = resetStore, action);
    default:
      return appReducer(state, action);
  }
};

export default reducer;

