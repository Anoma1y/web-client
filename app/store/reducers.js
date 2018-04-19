import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AutoReducers from './_reducers';

export default combineReducers({
  routing: routerReducer,
  ...AutoReducers
});
