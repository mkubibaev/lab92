import React, {Component} from 'react';

class App extends Component {
    state = {
        username: '',
        usernameSet: false,
        messages: [],
        messageText: ''
    };

    componentDidMount() {
        this.websocket = new WebSocket('ws://localhost:8000/chat');

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

    setUsername = () => {
        const message = {
            type: 'SET_USERNAME',
            username: this.state.username
        };

        this.websocket.send(JSON.stringify(message));
        this.setState({usernameSet: true});
    };

    sendMessage = () => {
        const message = JSON.stringify({
            type: 'CREATE_MESSAGE',
            text: this.state.messageText
        });

        this.websocket.send(message);
    };

    render() {
        let chat = (
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

        if (!this.state.usernameSet) {
            chat = (
                <div>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.changeInputHandler}
                    />
                    <input type="button" onClick={this.setUsername} value="Set username"/>
                </div>
            );
        }

        return (
            <div className="App">
                {chat}
            </div>
        );
    }

}

export default App;
