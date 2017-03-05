import store from '../store';

import { ADD_ERROR_MESSAGE, CLEAR_MESSAGES } from './types/messageTypes';

export function addErrorMessage(error) {
    store.dispatch({
        type: ADD_ERROR_MESSAGE,
        error
    });
}

export function clearMessages() {
    store.dispatch({
        type: CLEAR_MESSAGES
    });
}