import { takeEvery } from "redux-saga/effects";
import { put, call } from 'redux-saga/effects'
import { authFailed, startAuthTimeout, authSuccess } from '../actions/auth'
import axios from 'axios'

function login(email, password, isSignup) {
    const url = isSignup ?
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_API_KEY}` :
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
            
    return axios.post(
        url,
        {
            email,
            password,
            returnSecureToken: true
        }
    );
}

function* loginSaga(action) {
    const { email, password, isSignup } = action.payload;
    
    try {
        const response = yield call(login, email, password, isSignup);

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield put(authSuccess(
            response.data.idToken, 
            response.data.localId,
            expirationDate));

        yield put(startAuthTimeout(response.data.expiresIn * 1000))
    } catch (error) {
        debugger;
        yield put(authFailed(error));
    }
}

export function* watchLogin() {
    yield takeEvery('AUTH_START', loginSaga);
}