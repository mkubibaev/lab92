import React, {Component} from 'react';
import {connect} from "react-redux";
import OnlineUsersList from "../../components/OnlineUsersList/OnlineUsersList";
import Messages from "../../components/Messages/Messages";
import ChatForm from "../../components/ChatForm/ChatForm";

class Chat extends Component {
    state = {
        onlineUsers: [],
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
            } else if (decodedMessage.type === 'ONLINE_USERS') {
                this.setState( {
                    onlineUsers: decodedMessage.onlineUsers
                });
            }
        };
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
            <div className="row">
                <div className="col-12 col-sm-4">
                    <OnlineUsersList onlineUsers={this.state.onlineUsers}/>
                </div>
                <div className="col-12 col-sm-8">
                    <Messages/>
                    <ChatForm/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Chat);
