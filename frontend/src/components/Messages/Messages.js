import React, {Fragment} from 'react';

const Messages = props => {
    return (
        <Fragment>
            <h5>Messages</h5>
            <div className="box p-3 mb-4">
                <div className="messages">
                    {props.messages.map(message => (
                        <p key={message._id} className="border-bottom">
                            <span>{message.text}</span>
                        </p>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default Messages;
