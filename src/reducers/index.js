import { combineReducers } from 'redux';
import auth from './auth';
import items from './items';
const rootReducer = combineReducers({
  auth,
  items,
});
export default rootReducer;