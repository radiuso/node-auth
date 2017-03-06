import update from 'react-addons-update';

import { IS_LOADING, IS_LOADED, DISPLAY_SEARCH, HIDE_SEARCH } from '../actions/types/appTypes';

let initialState = {
  isLoading: true,
  isSearchable: false
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

      case DISPLAY_SEARCH:
        return update(state, {
          isSearchable: { $set: true }
        });
      case HIDE_SEARCH:
        return update(state, {
          isSearchable: { $set: false }
        });
      default:
        return state;
    }
};
