import {NEW_MESSAGE, ONLINE_USERS} from "../actions/actionTypes";

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

        case NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, decodedMessage.message]
            };

        default:
            return state;
    }
};

export default chatReducer;
