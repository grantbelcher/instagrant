import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chats';
import notifications from './notifications';
import timer from './timer';
import views from './views';

export default combineReducers({
  auth,
  chat,
  notifications,
  timer,
  views,
});
