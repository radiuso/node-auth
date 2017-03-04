import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, LOGIN_ERROR, LOGOUT } from '../actions/types/authTypes';

let initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        const user = action.user;
        return {
          isAuthenticated: !isEmpty(user),
          user
        };
      case LOGIN_ERROR: 
        const response = action.payload.error.response;
        const error = {
          status: response.status,
          message: response.data.message,
          originalMessage: response.message
        };
        
        return {
          isAuthenticated: false,
          user: {},
          error
        };

      case LOGOUT:
        return initialState;
      default:
        return state;
    }
};
