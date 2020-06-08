import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chats';

export default combineReducers({ auth, chat });
