import update from 'react-addons-update';

import { ADD_ERROR_MESSAGE, CLEAR_MESSAGES } from '../actions/types/messageTypes';

let initialState = {
  error: {},
  info: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case CLEAR_MESSAGES: 
        return initialState;
      case ADD_ERROR_MESSAGE:
        const error = action.error;
        const nextState = update(state, {
          error: { $set: error }
        });
        return nextState;
      default:
        return state;
    }
};
