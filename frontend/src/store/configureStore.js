import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";

import axios from '../axios-api';
import {loadState, saveState} from "./localStorage";
import usersReducer from "./reducers/usersReducer";
import chatReducer from "./reducers/chatReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    chat: chatReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedSate = loadState();

const store = createStore(rootReducer, persistedSate, enhancers);

store.subscribe(() => {
    saveState({
        users: {
            user: store.getState().users.user
        }
    });
});

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {
        //do nothing, user is not logged in
    }


    return config;
});

export default store;
