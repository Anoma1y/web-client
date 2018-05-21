import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AppReduce from './store/reducer'
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as notifReducer } from 'redux-notifications';
import AutoReducers from './_reducers';

export default combineReducers({
  App: AppReduce,
  notifs: notifReducer,
  form: reduxFormReducer,
  routing: routerReducer,
  ...AutoReducers
});
