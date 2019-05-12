import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {loginUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state})
    };


    render() {
        return (
            <Fragment>
                <h2 className="text-center my-4">Login</h2>
                <div className="user-form box">
                    {this.props.error && (
                        <div className="alert alert-danger">
                            {this.props.error.message || this.props.error.global}
                        </div>
                    )}

                    <form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            placeholder="Username"
                        />
                        <FormElement
                            type="password"
                            propertyName="password"
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            placeholder="Password"
                        />
                        <button type="submit" className="btn btn-success form-control">Login</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
