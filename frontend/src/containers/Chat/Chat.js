import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Form from "../../components/UI/Form/Form";
import Message from "../../components/Message/Message";

class Chat extends Component {
    state = {
        messages: [],
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

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="item list-group">
                        <h5>Online users</h5>
                        <a href="#" className="list-group-item list-group-item-action active">
                            Cras justo odio
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                        <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
                        <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                        <a href="#" className="list-group-item list-group-item-action disabled" tabIndex="-1"
                           aria-disabled="true">Vestibulum at eros</a>
                    </div>
                    <div className="item chat-room">
                        <h5>Chat room</h5>
                        {this.state.messages.map((message, i) => (
                            <Message
                                key={i}
                                username={message.username}
                                text={message.text}
                            />
                        ))}
                    </div>
                </div>
                    <Form
                        error={this.props.error}
                    />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Chat);
