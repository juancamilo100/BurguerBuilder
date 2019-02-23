import * as actions from '../actions/actionTypes'
import axios from 'axios'
import {
    FIREBASE_API_KEY
} from '../../config'

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        authData
    }
}

const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error
    }
}

export const auth = (email, password) => {
    return async (dispatch) => {
        dispatch(authStart())
        try {
            const response = await axios.post(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + FIREBASE_API_KEY,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            dispatch(authSuccess(response))
        } catch (error) {
            dispatch(authFailed(error))
        }
    }
}