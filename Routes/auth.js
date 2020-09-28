const router = require('express').Router();
const UserModel = require('../model/User')
const { registerValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')

//register new user
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
        const userObject = await UserModel.findOne({_id: savedUser._id}, '-password')
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.send({ok: true, status: 200, user: userObject, jwt: token});
    }catch (e) {
        res.status(400).send(e)
    }
})

//login user
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
    const userObject = await UserModel.findOne({_id: user._id}, '-password')
    res.send({ok: true, status: 200, user: userObject, jwt: token});
})

//get online data
router.get('/', verify,async (req, res) => {
    const userObject = await UserModel.findOne({_id: req.user._id}, '-password')
    res.send({ok: true, code: 200, object: userObject});
})

//synchronize data
router.patch('/', verify, async (req, res) => {
    try{
        const userObject = await UserModel.findOne({_id: req.user._id})
        await userObject.updateOne({harborsArray: req.body.harborsArray, tripsArray: req.body.tripsArray, log: req.body.log});
        await userObject.save()
        res.send({ok: true, code: 200})
    }catch (e) {
        res.status(400).send({error: true, code: 400, msg: "something get wrong"})
    }

})

module.exports = router;
