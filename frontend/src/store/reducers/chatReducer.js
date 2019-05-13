import {LATEST_MESSAGES, NEW_MESSAGE, USER_CONNECTED, ONLINE_USERS, USER_LEFT} from "../actions/actionTypes";

const initialState = {
    onlineUsers: [],
    messages: [],
};

const chatReducer = (state = initialState, decodedMessage) => {
    switch (decodedMessage.type) {
        case ONLINE_USERS:
            return {
                ...state,
                onlineUsers: decodedMessage.onlineUsers
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

        case USER_CONNECTED:
            return  {
                ...state,
                messages: [...state.messages, decodedMessage.message]
            };

        case USER_LEFT:
            return {
                ...state,
                messages: [...state.messages, decodedMessage.message]
            };

        default:
            return state;
    }
};

export default chatReducer;
