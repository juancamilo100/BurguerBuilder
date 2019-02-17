import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducer from './store/reducers/reducer'
import { createStore, applyMiddleware, compose } from 'redux'

const middleware = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching action: ', action);
            console.log('[Middleware] Current state: ', store.getState());
            const result = next(action);
            console.log('[Middleware] Next state: ', store.getState());
            return result;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(middleware)
));

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
