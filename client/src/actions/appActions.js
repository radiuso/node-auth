import store from '../store';

import { IS_LOADING, IS_LOADED, DISPLAY_SEARCH, HIDE_SEARCH } from './types/appTypes';

export function isLoading() {
    store.dispatch({ type: IS_LOADING });
}

export function isLoaded() {
    store.dispatch({ type: IS_LOADED });
}

export function setPageState({ isSearchable }) {
    if(isSearchable) {
        store.dispatch({ type: DISPLAY_SEARCH });
    } else {
        store.dispatch({ type: HIDE_SEARCH });
    }
}