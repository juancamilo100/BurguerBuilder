import * as actions from '../actions/actionTypes'
import axios from 'axios'

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (token, userId, expiresIn) => {
    return {
        type: actions.AUTH_SUCCESS,
        token,
        userId,
        expiresIn
    }
}

const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error
    }
}

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT
    }
}

const startAuthTimeout = (expiresIn) => {
    return (dispatch) => {
            setTimeout(() => {
            dispatch(logout());
        }, expiresIn)
    }
}

export const authCheckInitialState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('FIREBASE_TOKEN');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('FIREBASE_TOKEN_EXPIRATION'));
            const userId = localStorage.getItem('FIREBASE_USER_ID')

            if(expirationDate <= new Date()) {
                dispatch(logout());
            }

            dispatch(authSuccess(token, userId, expirationDate));
            dispatch(startAuthTimeout(expirationDate.getTime() - new Date().getTime()))
        }
    }
}

export const auth = (email, password, isSignup) => {
    return async (dispatch) => {
        dispatch(authStart())
        try {
            const url = isSignup ?
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_API_KEY}` :
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
            
            const response = await axios.post(
                url,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
                );
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                
                dispatch(authSuccess(
                    response.data.idToken, 
                    response.data.localId,
                    expirationDate));

                dispatch(startAuthTimeout(response.data.expiresIn * 1000))
            } catch (error) {
            dispatch(authFailed(error))
        }
    }
}