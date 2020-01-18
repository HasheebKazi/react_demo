import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util/util';


const initialState = {
    loading: false,
    error: false,
    authData: {
        token: null,
        userId: null,
        email: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { loading: true, error: null });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { loading: false, error: null, authData: {
                token: action.authData['idToken'],
                userId: action.authData['localId'],
                email: action.authData['email']
            }});
        case actionTypes.AUTH_FAIL:
            return updateObject(state, { loading: false, error: action.error });
        case actionTypes.AUTH_END:
            return updateObject({ loading: false, error: false, authData: {
                token: null,
                userId: null,
                email: null
            }});
        default:
            return state
    }
}

export default reducer;