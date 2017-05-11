import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import ui from './reducer/ui';
import user from './reducer/user';

const logger = createLogger();
const reducers = combineReducers({ ui, user });
export default createStore(reducers, composeWithDevTools(
  applyMiddleware()
));
