import {
    LATEST_MESSAGES,
    NEW_MESSAGE,
    USER_CONNECTED,
    ONLINE_USERS,
    USER_LEFT,
    DELETE_MESSAGE
} from "../actions/actionTypes";

const initialState = {
    onlineUsers: [],
    messages: [],
};

const deleteMsg = (id, msgList) => {
    for (let i = 0; i < msgList.length; i++) {
        const item = msgList[i];

        if(item._id === id) {
            msgList.splice(i, 1);

            return msgList;
        }
    }
};

const deleteUser = (user, userList) => {
    const index = userList.indexOf(user);

    if (index !== -1) {
        userList.splice(index, 1);

        return userList;
    }
};

const chatReducer = (state = initialState, decodedMessage) => {
    switch (decodedMessage.type) {
        case ONLINE_USERS:
            return {
                ...state,
                onlineUsers: [...decodedMessage.onlineUsers]
            };

        case LATEST_MESSAGES:
            return {
                ...state,
                messages: [...decodedMessage.messages]
            };

        case NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, decodedMessage.message]
            };

        case DELETE_MESSAGE:
            return {
                ...state,
                messages: deleteMsg(decodedMessage.messageId, [...state.messages])
            };
        case USER_CONNECTED:
            return  {
                ...state,
                messages: [...state.messages, decodedMessage.message]
            };

        case USER_LEFT:
            return {
                ...state,
                messages: [...state.messages, decodedMessage.message],
                onlineUsers: deleteUser(decodedMessage.user, [...state.onlineUsers])
            };

        default:
            return state;
    }
};

export default chatReducer;
