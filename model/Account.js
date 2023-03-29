const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    name: String,
    email: String,
    age: String,
    schoolyear: String,
    school: String,
    password: String,

    lastAuthentication: Date,
});

mongoose.model('accounts', accountSchema);