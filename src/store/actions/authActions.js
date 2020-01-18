import * as actionTypes from './actionTypes';
import axios from 'axios';
import { FIREBASE_API_KEY } from '../../magic';

// show all orders page
const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: payload['authData']
    };
};

const authFail = (payload) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: payload['error']
    }
};

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_END
    };
};

const checkAuthTimeout = (expirationTime) => {
    console.log(expirationTime);
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const initAuth = (payload) => {
    return dispatch => {

        dispatch(authStart());
        const email = payload['email'];
        const password = payload['password'];
        const isSignup = payload['isSignup'];

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ FIREBASE_API_KEY }`

        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ FIREBASE_API_KEY }`
        }

        axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(response => {
            // console.log('response data:', response.data);
            // console.log('[AUTH_ACTIONS] POST initAuth, reponse:', response.data);
            dispatch(authSuccess({
                authData: response.data
            }));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFail({
                error: error.response.data.error
            }));
        });
    }
}


