const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    email: String,
    stage: Number,
    levelLength: Number,
    score: Number,
    movesCount: Number,
    difficulty: String,
    timeStamp: Date,
});

mongoose.model('scores', scoreSchema);