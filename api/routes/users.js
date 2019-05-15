const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = new User({
            fullName: req.body.fullName,
            username: req.body.username,
            password: req.body.password
        });

        user.generateToken();
        await user.save();

        return res.send({message: 'User registered', user});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {

    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({message: 'Username or Password incorrect !'});

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) return res.status(400).send({message: 'Username or Password incorrect !'});

    user.generateToken();
    await user.save();

    return res.send({message: 'Login successful', user});
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Logged out'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
});

module.exports = router;