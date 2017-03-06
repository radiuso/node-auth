import Notifications from 'react-notification-system-redux';
import store from '../store';


export function addMessage(message, type) {
    store.dispatch(Notifications.show({
        message: message.message
    }, type));
}

export function addErrorMessage(message) {
    addMessage(message, 'error');
}

export function addWarningMessage(message) {
    addMessage(message, 'warning');
}

export function clearMessages() {
    Notifications.hide();
}