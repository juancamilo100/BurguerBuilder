import * as actions from '../actions/actionTypes'
import axios from 'axios'

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        token,
        userId
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
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(startAuthTimeout(response.data.expiresIn * 1000))
            } catch (error) {
            console.log(error);
            
            dispatch(authFailed(error))
        }
    }
}