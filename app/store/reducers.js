import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AppReduce from './store/reducer'
import { reducer as reduxFormReducer } from 'redux-form';
import AutoReducers from './_reducers';

export default combineReducers({
  App: AppReduce,
  form: reduxFormReducer,
  routing: routerReducer,
  ...AutoReducers
});
