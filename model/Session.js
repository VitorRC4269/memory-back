const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    email: String,
    difficulty: String,
    timeStamp: Date,
});

mongoose.model('sessions', sessionSchema);