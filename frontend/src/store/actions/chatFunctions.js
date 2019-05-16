import {wsURL} from "../../constants";

export const connectChat = token => {
    return new WebSocket(`${wsURL}/chat?token=${token}`);
};

export const sendMessage = (ws, messageText) => {
    const message = JSON.stringify({
        type: 'CREATE_MESSAGE',
        text: messageText
    });

    ws.send(message);
};

export const deleteMessage = (ws, messageId) => {
    const message = JSON.stringify({
        type: 'DELETE_MESSAGE',
        messageId
    });

    ws.send(message);
};

export const leftChat = (ws, user) => {
    const message = JSON.stringify({
        type: 'USER_LEFT',
        user
    });

    ws.send(message);
};
