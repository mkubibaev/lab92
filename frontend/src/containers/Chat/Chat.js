import React, {Component} from 'react';
import {connect} from "react-redux";
import OnlineUsersList from "../../components/OnlineUsersList/OnlineUsersList";
import Messages from "../../components/Messages/Messages";
import ChatForm from "../../components/ChatForm/ChatForm";
import store from "../../store/configureStore";
import {connectChat, leftChat} from "../../store/actions/chatFunctions";

class Chat extends Component {
    componentDidMount() {
        this.websocket = connectChat(this.props.user.token, this.props.user.username);

        this.websocket.onmessage = event => {
            const decodedMessage = JSON.parse(event.data);

            if (decodedMessage && decodedMessage.type) {
                store.dispatch(decodedMessage);
            }
        };
    };

    componentWillUnmount() {
        leftChat(this.websocket, this.props.user.username);
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-4">
                    <OnlineUsersList onlineUsers={this.props.onlineUsers}/>
                </div>
                <div className="col-12 col-md-8">
                    <Messages
                        messages={this.props.messages}
                        user={this.props.user}
                        ws={this.websocket}
                    />
                    <ChatForm
                        ws={this.websocket}
                        user={this.props.user.username}
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
