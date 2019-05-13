const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nanoid = require('nanoid');

const config = require('./config');
const users = require('./routes/users');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const expressWs = require('express-ws')(app);
const port = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/users', users);

    const activeConnections = {};

    app.ws('/chat', async (ws, req) => {
        if (!req.query.token) {
            return ws.close();
        }
        
        const user = await User.findOne({token: req.query.token});
        if (!user) {
            return ws.close();
        }

        const id = nanoid();
        activeConnections[id] = {ws, user};

        const connectingMessage = new Message({text: user.username + ' connected'});
        await connectingMessage.save();

        Object.keys(activeConnections).forEach(connId => {
            const conn = activeConnections[connId].ws;
            conn.send(JSON.stringify({
                type: 'USER_CONNECTED',
                message: connectingMessage
            }));
        });

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
        }))
    
        ws.on('message', async msg => {
            const decodedMessage = JSON.parse(msg);
            let message = null;
            let messageForSend = '';

            switch (decodedMessage.type) {    
                case 'CREATE_MESSAGE':
                    message = new Message({text: decodedMessage.text});
                    await message.save();

                    messageForSend = JSON.stringify({
                        type: 'NEW_MESSAGE',
                        message
                    });

                    Object.keys(activeConnections).forEach(connId => {
                        const conn = activeConnections[connId].ws;
                        conn.send(messageForSend);
                    });
                    break; 
                case 'USER_LEFT':
                    message = new Message({text: decodedMessage.user + ' left'});
                    await message.save();

                    const userIndex = onlineUsers.indexOf(decodedMessage.user);

                    if (userIndex !== -1) {
                        onlineUsers.splice(userIndex, 1);
                    }

                    messageForSend = JSON.stringify({
                        type: 'USER_LEFT',
                        message
                    });
                    Object.keys(activeConnections).forEach(connId => {
                        const conn = activeConnections[connId].ws;
                        conn.send(messageForSend);
                    });

                    Object.keys(activeConnections).forEach(connId => {
                        const conn = activeConnections[connId].ws;
                        conn.send(JSON.stringify({
                            type: 'ONLINE_USERS',
                            onlineUsers
                        }));
                    });
                    break;
                default:
                    console.log('Unknown message type: ', decodedMessage.type);
            }
        });
    
        ws.on('close', msg => {
            delete activeConnections[id];
        });
    });


    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});
