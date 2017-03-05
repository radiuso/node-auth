/* Reducers */
import appReducer from './appReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

export default {
  appState: appReducer,
  authState: authReducer,
  userState: userReducer,
  messageState: messageReducer
};
