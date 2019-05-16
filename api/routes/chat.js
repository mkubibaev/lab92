const nanoid = require('nanoid');

const User = require('../models/User');
const Message = require('../models/Message');

const sendMsgToAll = (connections, msg) => {
    Object.keys(connections).forEach(connId => {
        const conn = connections[connId].ws;
        conn.send(JSON.stringify(msg));
    });
};


const activeConnections = {};

const chat = async (ws, req) => {
    if (!req.query.token) {
        return ws.close();
    }
    
    const user = await User.findOne({token: req.query.token});
    if (!user) {
        return ws.close();
    }

    const id = nanoid();
    activeConnections[id] = {ws, user};

    const onlineUsers = Object.keys(activeConnections).map(connId => {
        return activeConnections[connId].user.username;
    });

    ws.send(JSON.stringify({
        type: 'ONLINE_USERS',
        onlineUsers
    }));

    ws.send(JSON.stringify({
        type: 'LATEST_MESSAGES',
        messages: await Message.find().limit(30)
    }));

    const connectingMessage = new Message({
        text: user.username + ' connected',
        isSystem: true
    });
    await connectingMessage.save();

    sendMsgToAll(activeConnections, {
        type: 'USER_CONNECTED',
        message: connectingMessage
    });

    sendMsgToAll(activeConnections, {
        type: 'ONLINE_USERS',
        onlineUsers
    });

    ws.on('message', async msg => {
        let decodedMessage;

        try {
            decodedMessage = JSON.parse(msg);
        } catch (e) {
            return console.log('Not valid message');
        }

        let message = null;

        switch (decodedMessage.type) {    
            case 'CREATE_MESSAGE':
                message = new Message({text: decodedMessage.text});
                await message.save();

                sendMsgToAll(activeConnections, {
                    type: 'NEW_MESSAGE',
                    message
                });
                break;
            
            case 'DELETE_MESSAGE':
                const messageId = decodedMessage.messageId;
                await Message.deleteOne({_id: messageId});
                
                sendMsgToAll(activeConnections, {
                    type: 'DELETE_MESSAGE',
                    messageId
                });
                break;

            case 'USER_LEFT':
                message = new Message({
                    text: decodedMessage.user + ' left',
                    isSystem: true
                });
                await message.save();

                sendMsgToAll(activeConnections, {
                    type: 'USER_LEFT',
                    message,
                    user: decodedMessage.user
                });

                ws.close();
                break;
            default:
                console.log('Unknown message type: ', decodedMessage.type);
        }
    });

    ws.on('close', msg => {
        delete activeConnections[id];
    });
};

module.exports = chat;