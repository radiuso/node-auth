import store from '../store';
import ThingService from '../services/ThingService';

import { FETCH_THINGS, FETCH_THINGS_SUCCESS } from './types/thingTypes';

export function fetchThings() {
  store.dispatchAsync(ThingService.fetchThings(), {
    request: FETCH_THINGS,
    success: FETCH_THINGS_SUCCESS
  });
}
