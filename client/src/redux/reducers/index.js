import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chats';
import notifications from './notifications';

export default combineReducers({ auth, chat, notifications });
