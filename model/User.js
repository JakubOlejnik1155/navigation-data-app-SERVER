const mongoose = require('mongoose');

const pos = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng : {
        type: Number,
        required: true
    }
})
const harbor = new mongoose.Schema({
    name:{
        type: String
    },
    desc: {
        type: String,
    },
    pos:{
        type: {pos},
        required: true,
    }
})

const trip = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    isfinished: {
        type: Boolean,
        required: true,
    },
    tripDistance: {
        type: Number,
        required: true,
    },
    coordsArray: {
        type: [[Number]],
        required: true,
    },
    speedArray: {
        type: [Number],
        required: true,
    }
})


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8,
    },
    date: {
        type: Date,
        default: Date.now
    },
    log: {
        type: Number,
        default: 0,
    },
    harborsArray: {
        type: [harbor],
        default: []
    },
    tripsArray: {
        type: [trip],
        default: []
    }

});

module.exports = mongoose.model('userSchema', userSchema);
