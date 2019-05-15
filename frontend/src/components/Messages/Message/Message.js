import React from 'react';
import {deleteMessage} from "../../../store/actions/chatFunctions";

const Message = props => {
    return (
        <div className="message box p-2 mb-2">
            <div className="d-flex justify-content-between border-bottom">
                <span>{props.text}</span>
                {props.user.role === 'moderator'
                    ? <button
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => deleteMessage(props.ws, props.id)}
                    >x</button>
                    : null
                }
            </div>
            <small className="text-secondary">{props.datetime}</small>

        </div>
    );
};

export default Message;
