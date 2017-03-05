import store from '../store';
import { hasAccessTo } from '../utils/restrictedArea';

export const redirectNotPermited = (nextState, replace) => {
  const pathname = nextState.location.pathname;

  if(!hasAccessTo(pathname)) {
    const auth = store.getState().authState;
    
    // redirect user with no required privilege
    if(auth.isAuthenticated) {
      replace({
        pathname: "/",
      });
    } 
    // redirect nonuser
    else {
      replace({
        pathname: "/login",
      });
    }
  }
}
