const router = require('express').Router();
const UserModel = require('../model/User')
const { registerValidation } = require('./validation');
const bcrypt = require('bcryptjs')

router.post('/register' , async(req, res) => {
    //validation
    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send({
            error: true,
            code: 400,
            msg: error.details[0].message
        })
    //is similar email in DB
    const emailExists = await UserModel.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send({
        error: true,
        code: 400,
        msg: 'email already exists in DB'
    })
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //make new user
    const user = new UserModel({
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save();
        res.send({ok: true, status: 200, userId: savedUser._id});
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router;
