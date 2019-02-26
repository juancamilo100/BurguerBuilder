import * as actions from '../actions/actionTypes'
import { updateObject } from '../utils'

const initialState = {
    token: null,
    expiresIn: null,
    userId: null,
    error: false,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return updateObject(state, {loading: true, error: null});

        case actions.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.token,
                userId: action.userId,
                expiresIn: action.expiresIn,
                error: null,
                loading: false
            })

        case actions.AUTH_FAILED:
            return updateObject(state, {error: action.error, loading: false});
        
        case actions.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null,
                error: null,
                loading: false
            });

        default:
            return state;
    }
}

export { authReducer as auth }