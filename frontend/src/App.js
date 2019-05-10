import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Header from "./components/UI/Header/Header";
import Routes from "./Routes";
import {logoutUser} from "./store/actions/usersActions";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header
                    user={this.props.user}
                    logout={this.props.logoutUser}
                />
                <main className="container py-3">
                    <Routes user={this.props.user}/>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
