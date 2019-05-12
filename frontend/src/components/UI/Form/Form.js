import React, {Component} from 'react';
import './Form.css';
import {connect} from "react-redux";

class Form extends Component {
    state = {
        messageText: ''
    };

    changeInputHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    sendMessage = () => {
        const message = JSON.stringify({
            type: 'CREATE_MESSAGE',
            text: this.state.messageText,
            username: this.props.user.username
        });

        this.websocket.send(message);
    };


    render() {
        return (
            <form className="form">

                <div className="container">
                    {this.props.error
                        ? <p className="text-warning border-bottom border-warning mb-3">{this.props.error}</p>
                        : null
                    }

                    <div className="form-row">
                        <div className="col-8">
                            <input
                                   className="form-control input-message"
                                   placeholder="message"
                                   type="text"
                                   name="messageText"
                                   value={this.state.messageText}
                                   onChange={this.changeInputHandler}
                            />
                        </div>
                        <div className="col-1">
                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={this.sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Form);