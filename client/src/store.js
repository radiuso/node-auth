import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { isUndefined } from 'lodash';

import reducers from './reducers';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import { addErrorMessage, clearMessages } from './actions/messageActions';
import { isLoading, isLoaded } from './actions/appActions';

// Combine Reducers
const mergedReducers = {
  ...reducers,
  routing: routerReducer
};

const store = createStore(
  combineReducers(mergedReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// set auth
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}



store.dispatchAsync = (promise, options, payload) => {
  const { request, success, failure, silent, dispatchErrorMessage } = options;

  // remove previous messages
  clearMessages();

  // set loading state
  if(!silent) {
    isLoading();
  }

  if(!isUndefined(request)) {
    store.dispatch({ type: request, payload: Object.assign({}, payload) });
  }

  promise
  .then(
    response => {
      // is Loaded
      if(!silent) {
        isLoaded();
      }

      store.dispatch({
        type: success,
        payload: Object.assign({}, payload, { response })
      });
    }
  )
  .catch(error => {
    const errorResponse = error.response;
    
    // is loaded
    if(!silent) {
      isLoaded();
    }

    // dispatch error reducer action if set
    if(!isUndefined(failure)) {
      store.dispatch({
        type: failure,
        payload: Object.assign({}, payload, { error })
      });
    }

    // add error message
    if(dispatchErrorMessage) {
      const simpleError = {
        code: errorResponse.status,
        codeText: errorResponse.statusText,
        message: errorResponse.data.message,
      };

      addErrorMessage(simpleError);
    }
  });
};

export default store;
