import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';

/** Create our store to be passed to our Provider component. */
const store = configureStore();

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
