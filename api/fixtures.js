const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    await User.create(
        {username: 'putin', fullName: 'Vladimir Putin', password: '123', role: 'user', token: 'qwerty'},
        {username: 'moderator', fullName: 'Moderovitch', password: '123', role: 'moderator', token: 'asdfg'}
    );


    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});