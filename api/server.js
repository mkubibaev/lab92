const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const users = require('./routes/users');
const chat = require('./routes/chat');

const app = express();
const expressWs = require('express-ws')(app);
const port = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/users', users);
    app.ws('/chat', chat);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});
