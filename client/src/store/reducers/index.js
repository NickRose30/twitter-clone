import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';

/** Here we will combine all of our reducers into one root reducer that can be used to create our redux store */
const rootReducer = combineReducers({
  currentUser,
  errors,
  messages
});

export default rootReducer;