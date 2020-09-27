const router = require('express').Router();
const UserModel = require('../model/User')
const { registerValidation } = require('./validation');


router.post('/register' , async(req, res) => {
    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send({
            error: true,
            code: 400,
            msg: error.details[0].message
        })
    const user = new UserModel({
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router;
