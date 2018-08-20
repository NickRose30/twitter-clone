import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/**
 * Create our redux store. First param is the root reducer and the second parameter is the store enhancer, meaning
 * middleware, basically. The default redux store enhancer is applyMiddleware. We combine store enhancers, or
 * middleware, using the compose function.
 */
export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
};