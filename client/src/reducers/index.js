/* Reducers */
import appReducer from './appReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default {
  appState: appReducer,
  authState: authReducer,
  userState: userReducer
};
