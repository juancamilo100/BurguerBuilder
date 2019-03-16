import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
    burgerBuilder,
    orders,
    auth
} from './store/reducers/'
import * as actions from './store/actions/auth'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './store/sagas/'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    burgerBuilder,
    orders,
    auth
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

store.subscribe(() => {
    if(store.getState().auth.token) {
        localStorage.setItem('FIREBASE_TOKEN', store.getState().auth.token);
        localStorage.setItem('FIREBASE_TOKEN_EXPIRATION', store.getState().auth.expiresIn);
        localStorage.setItem('FIREBASE_USER_ID', store.getState().auth.userId);
    } else {
        localStorage.removeItem('FIREBASE_TOKEN');
        localStorage.removeItem('FIREBASE_TOKEN_EXPIRATION');
        localStorage.removeItem('FIREBASE_USER_ID');
    }
});

sagaMiddleware.run(rootSaga);

store.dispatch(actions.authCheckInitialState());

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
