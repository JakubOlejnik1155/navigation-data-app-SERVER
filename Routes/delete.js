const router = require('express').Router();
const UserModel = require('../model/User');
const verify = require('./verifyToken')


router.delete('/harbor/:name', verify, async (req, res) =>{
    const harborName = req.params.name;
    try{
        const userObject = await UserModel.findOne({_id: req.user._id})
        const array = userObject.harborsArray;
        let newArray = []
        for (let i = 0 ; i < array.length ; i++){
            if (array[i].name !== harborName){
                newArray.push(array[i]);
            }
        }
        await userObject.updateOne({harborsArray: newArray});
        await userObject.save()
        res.send({ok: true, code: 200})
    }catch (e) {
        res.status(400).send({error: true, code: 400, msg: "something get wrong"})
    }
})

router.delete('/trip/:startTime', verify , async (req, res) => {
    const tripStartTime = req.params.startTime;
    try {
        const userObject = await UserModel.findOne({_id: req.user._id});
        const array = userObject.tripsArray;
        let newArray = [];
        for (let i = 0; i < array.length ; i++){
            if (array[i].startTime.toJSON() !== new Date(tripStartTime).toJSON()){
                newArray.push(array[i])
            }
        }
        await userObject.updateOne({tripsArray: newArray})
        await userObject.save();
        res.send({ok: true, status: 200})
    }catch (e) {
        res.status(400).send({error: true, code: 400, msg: "something get wrong"})
    }
})


module.exports = router;
