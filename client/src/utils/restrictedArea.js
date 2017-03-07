import { findIndex, isEmpty, isArray } from 'lodash';
import store from '../store';

const restrictedAreas = [{
    to: '/users',
    role: 'admin'
}];

export function hasAccessTo(to) {
    const areaIndex = findIndex(restrictedAreas, (area) => {
        return area.to === to;
    });

    if(areaIndex !== -1) {
        const auth = store.getState().authState;
        const requiredRole = restrictedAreas[areaIndex].role;
        let hasRequiredRole = true;
        
        if(!isEmpty(requiredRole)) {
            if(isArray(requiredRole)) {
                hasRequiredRole = findIndex(requiredRole, auth.user.role) > -1;
            } else {
                hasRequiredRole = auth.user.role === requiredRole;
            }
        }
        return auth.isAuthenticated && hasRequiredRole;
    } 

    return true;
}
