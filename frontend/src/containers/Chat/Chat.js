import React, {Component} from 'react';
import {connect} from "react-redux";
import OnlineUsersList from "../../components/OnlineUsersList/OnlineUsersList";
import Messages from "../../components/Messages/Messages";
import ChatForm from "../../components/ChatForm/ChatForm";
import {wsURL} from "../../constants";
import store from "../../store/configureStore";

class Chat extends Component {
    state = {
        messages: [],
        messageText: ''
    };

    componentDidMount() {
        this.websocket = new WebSocket(`${wsURL}/chat?token=${this.props.user.token}`);

        this.websocket.onmessage = event => {
            const decodedMessage = JSON.parse(event.data);

            if (decodedMessage && decodedMessage.type) {
                store.dispatch(decodedMessage);
            }
        };
    };

    sendMessage = messageText => {
        const message = JSON.stringify({
            type: 'CREATE_MESSAGE',
            text: messageText,
            username: this.props.user.username
        });

        this.websocket.send(message);
    };

    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-4">
                    <OnlineUsersList onlineUsers={this.props.onlineUsers}/>
                </div>
                <div className="col-12 col-sm-8">
                    <Messages
                        messages={this.props.messages}
                    />
                    <ChatForm
                        onSubmit={this.sendMessage}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    onlineUsers: state.chat.onlineUsers,
    messages: state.chat.messages
});

export default connect(mapStateToProps)(Chat);
