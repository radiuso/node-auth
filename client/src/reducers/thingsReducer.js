import { FETCH_THINGS_SUCCESS } from '../actions/types/thingTypes';
// import update from 'react-addons-update';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_THINGS_SUCCESS:
        return action.payload.response.data;

      default:
        return state;
    }
};
