import store from '../store';

import { ADD_ERROR_MESSAGE, ADD_WARNING_MESSAGE, CLEAR_MESSAGES } from './types/messageTypes';


function addMessage(type, message) {
    store.dispatch({
        type,
        message
    });
    setTimeout(() => {
      clearMessages();
    }, 4000);
}

export function addErrorMessage(message) {
    addMessage(ADD_ERROR_MESSAGE, message);
}

export function addWarningMessage(message) {
    addMessage(ADD_WARNING_MESSAGE, message);
}

export function clearMessages() {
    store.dispatch({
        type: CLEAR_MESSAGES
    });
}