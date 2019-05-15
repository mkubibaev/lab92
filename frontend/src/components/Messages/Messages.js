import React, {Fragment} from 'react';
import Message from "./Message/Message";

const Messages = props => {
    return (
        <Fragment>
            <h5>Messages</h5>
            <div className="messages mb-3">
                {props.messages.map(message => (
                    <Message
                        key={message._id}
                        id={message._id}
                        text={message.text}
                        datetime={message.datetime}
                        ws={props.ws}
                        user={props.user}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default Messages;
