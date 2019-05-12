const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nanoid = require('nanoid');

const config = require('./config');
const users = require('./routes/users');
const User = require('./models/User');

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

        const onlineUsers = Object.keys(activeConnections).map(connId => {
            return activeConnections[connId].user.username;
        });

        ws.send(JSON.stringify({
            type: 'ONLINE_USERS',
            onlineUsers
        }));
    
        ws.on('message', msg => {
            const decodedMessage = JSON.parse(msg);

            switch (decodedMessage.type) {    
                case 'CREATE_MESSAGE':
                    const message = JSON.stringify({
                        type: 'NEW_MESSAGE', message: {
                            username: decodedMessage.username,
                            text: decodedMessage.text
                        }
                    });
                    Object.keys(activeConnections).forEach(connId => {
                        const conn = activeConnections[connId].ws;
                        conn.send(message);
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
