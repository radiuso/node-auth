/* Reducers */
import appReducer from './appReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import thingsReducer from './thingsReducer';

export default {
  appState: appReducer,
  authState: authReducer,
  userState: userReducer,
  thingsState: thingsReducer  
};
