import * as actions from '../actions/actionTypes'

export const authStart = (email, password, isSignup) => {
    return {
        type: actions.AUTH_START,
        payload: {
            email, 
            password, 
            isSignup
        }
    }
}

export const authSuccess = (token, userId, expiresIn) => {
    return {
        type: actions.AUTH_SUCCESS,
        token,
        userId,
        expiresIn
    }
}

export const authFailed = (error) => {
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

export const startAuthTimeout = (expiresIn) => {
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