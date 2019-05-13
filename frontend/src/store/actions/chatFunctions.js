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

export const newUser = (ws, user) => {
    const message = JSON.stringify({
        type: 'USER_CONNECTED',
        user
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
