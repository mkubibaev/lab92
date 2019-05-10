import React, {Component} from 'react';
import {connect} from "react-redux";

class Chat extends Component {
    state = {
        messages: [],
        messageText: ''
    };

    componentDidMount() {
        this.websocket = new WebSocket(`ws://localhost:8000/chat?token=${this.props.user.token}`);

        this.websocket.onmessage = event => {
            const decodedMessage = JSON.parse(event.data);
            if (decodedMessage.type === 'NEW_MESSAGE') {
                this.setState({
                    messages: [...this.state.messages, decodedMessage.message]
                });
            }
        };
    }

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
            <div>
                {this.state.messages.map((message, i) => (
                    <div key={i}>
                        <b>{message.username}</b>:
                        <span>{message.text}</span>
                    </div>
                ))}
                <div>
                    <input
                        type="text"
                        name="messageText"
                        value={this.state.messageText}
                        onChange={this.changeInputHandler}
                    />
                    <input type="button" value="Send" onClick={this.sendMessage}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Chat);
