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

export const authRedirect = (payload) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        url: payload['url']
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_END
    };
};

const checkAuthTimeout = (expirationTime) => {
    // console.log(expirationTime);

    return (dispatch) => {
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userId');

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
            console.log('response data: ==========================', response.data);
            // console.log('[AUTH_ACTIONS] POST initAuth, reponse:', response.data);

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId',response.data.localId);


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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({
                    authData: {
                        idToken: token,
                        localId: userId
                    }
                }));
                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime())/1000)
                    );
            } else {
                dispatch(logout());
            }
        }
    };
};


