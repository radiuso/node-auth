import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { browserHistory } from 'react-router'

import JWT from 'jwt-client';
import { isUndefined } from 'lodash';


import { reducer as notifications } from 'react-notification-system-redux';

import reducers from './reducers';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import { addErrorMessage, clearMessages } from './actions/messageActions';
import { isLoading, isLoaded } from './actions/appActions';

// Combine Reducers
const mergedReducers = {
  ...reducers,
  notifications,
  routing: routerReducer
};

// TODO remove devtool in prod
const store = createStore(
  combineReducers(mergedReducers),
  composeWithDevTools()
);

// set auth
const token = JWT.get();
if(token) {
  if(JWT.validate(token)) {
    const readableToken = JWT.read(token);
    setAuthorizationToken(token);
    store.dispatch(setCurrentUser(readableToken.claim));
  } else {
    JWT.forget();
    browserHistory.push('/login');
  }
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
    console.log(error);
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
