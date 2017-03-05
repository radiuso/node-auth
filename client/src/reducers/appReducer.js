import update from 'react-addons-update';

import { IS_LOADING, IS_LOADED } from '../actions/types/appTypes';

let initialState = {
  isLoading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
      case IS_LOADING: 
        return update(state, {
          isLoading: { $set: true }
        });
        
      case IS_LOADED:
        return update(state, {
          isLoading: { $set: false }
        });

      default:
        return state;
    }
};
