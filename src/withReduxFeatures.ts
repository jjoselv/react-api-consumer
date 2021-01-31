import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import promise from 'redux-promise-middleware';
import {UsersReducer} from './features/users';
import {SettingsReducer} from './features/settings';
import withProvider from './withProvider';

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  users: UsersReducer,
  settings: SettingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/* eslint-disable no-underscore-dangle */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
/* eslint-enable */

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise))
);

export type StoreType = typeof store;

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({store, Provider});

export type ProviderType = typeof Provider;
