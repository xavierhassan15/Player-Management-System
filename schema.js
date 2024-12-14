const { timeStamp } = require('console');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerId:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        min: [0, 'age cannot be negative']
    },
    role:{
        type: String,
        required: true,
        trim: true
    },
},
    {
        timestamps: true
});
module.exports = mongoose.model('Player', playerSchema);