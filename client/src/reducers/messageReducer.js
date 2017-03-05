import update from 'react-addons-update';

import { ADD_ERROR_MESSAGE, ADD_WARNING_MESSAGE, CLEAR_MESSAGES } from '../actions/types/messageTypes';

let initialState = {
  error: {},
  info: {},
  warning: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case CLEAR_MESSAGES:
        return initialState;

      case ADD_ERROR_MESSAGE:
        return update(state, {
          error: { $set: action.message }
        });

      case ADD_WARNING_MESSAGE:
        return update(state, {
          warning: { $set: action.message }
        });

      default:
        return state;
    }
};
