const router = require('express').Router();
const UserModel = require('../model/User')
const { registerValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register' , async(req, res) => {
    //validation
    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send({
            error: true,
            code: 400,
            msg: error.details[0].message
        })
    //are passwords similar
    if (req.body.password !== req.body.password2)
        return res.status(400).send({
            error: true,
            code: 400,
            msg: "passwords are not the same"
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

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error)
        return res.status(400).send({
            error: true,
            code: 400,
            msg: error.details[0].message
        })
    //is user
    const user = await UserModel.findOne({email: req.body.email})
    if (!user) return res.status(400).send({
        error: true,
        code: 400,
        msg: 'Email is not found'
    })
    //isPasswordCorrect
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({
        error: true,
        code: 400,
        msg: 'Email or Password is wrong'
    })
    //create JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ok: true, status: 200})
})

module.exports = router;
