import authReducer from './authReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

export default {
  authState: authReducer,
  userState: userReducer,
  messageState: messageReducer
};
