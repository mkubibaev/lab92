import React from 'react';

import './Message.css'

const Message = props => {
    return (
        <div className="message">
            <span className="message-username">{props.username}</span>
            <p className="message-text">{props.text}</p>
        </div>
    );
};

export default Message;