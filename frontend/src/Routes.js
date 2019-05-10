import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Chat from "./containers/Chat/Chat";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to="/login" />
);

const Routes = ({user}) => {
    return (
        <Switch>

            <ProtectedRoute
                isAllowed={user}
                path="/"
                exact
                component={Chat}
            />

            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    );
};

export default Routes;
