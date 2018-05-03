import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import AutoReducers from './_reducers';

export default combineReducers({
  form: reduxFormReducer,
  routing: routerReducer,
  ...AutoReducers
});
