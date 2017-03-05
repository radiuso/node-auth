import store from '../store';
import { hasAccessTo } from '../utils/restrictedArea';
import { addWarningMessage } from '../actions/messageActions';

export const redirectNotPermited = (nextState, replace) => {
  const pathname = nextState.location.pathname;

  if(!hasAccessTo(pathname)) {
    const auth = store.getState().authState;
    
    // redirect user with no required privilege
    if(auth.isAuthenticated) {
      replace({
        pathname: "/",
      });

      addWarningMessage({
        code: 401,
        message: "you d'ont have enouth privilege"
      });
    } 
    // redirect nonuser
    else {
      replace({
        pathname: "/login",
      });

      addWarningMessage({
        code: 401,
        message: "please connect first"
      });
    }
  }
}
