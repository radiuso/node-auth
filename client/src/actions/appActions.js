import store from '../store';

import { IS_LOADING, IS_LOADED } from './types/appTypes';

export function isLoading() {
    store.dispatch({ type: IS_LOADING });
}

export function isLoaded() {
    store.dispatch({ type: IS_LOADED });
}
