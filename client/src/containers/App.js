import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from 'jwt-decode';

/** Create our store to be passed to our Provider component. */
const store = configureStore();

/** This will set the current user and the auth token header if there is already an auth token in local storage */
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  /** We wrap this in a try catch because someone could alter the token in local storage and we don't want that
   * to be passed to the setCurrentUser function.
   */
  try {
    /** Dispatch the action to set the current user.
     * We use jwt-decode to decode the middle part of the auth token to be passed to setCurrentUser.
     */
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    /** If there is an issue, we want to forcibly log the user out */
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Main />
      </div>
    </Router>
  </Provider>
);


export default App;
