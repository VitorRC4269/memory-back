const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})");

module.exports = app => {
    // Routes
    app.post('/account/login', async (req, res) => {

        var response = {};

        const { rEmail, rPassword } = req.body;
        if(rEmail == null || !passwordRegex.test(rPassword))
        {
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({ email: rEmail}, 'email adminFlag password');
        if(userAccount != null){
            argon2i.verify(userAccount.password, rPassword).then(async (success) => {
                if(success){
                    userAccount.lastAuthentication = Date.now();
                    await userAccount.save();

                    response.code = 0;
                    response.msg = "Account found";
                    console.log(userAccount);
                    response.data = ( ({email, adminFlag}) => ({email, adminFlag }) )(userAccount);
                    res.send(response);

                    return;
                }
                else{
                    response.code = 1;
                    response.msg = "Invalid credentials";
                    res.send(response);
                    return;
                }
            });
        }
        else{
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }
    });

    app.post('/account/create', async (req, res) => {

        var response = {};

        const { rEmail, rPassword, rName, rAge, rSchoolYear, rSchool } = req.body;
        if(rEmail == null || rEmail.length < 3)
        {
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }

        console.log(passwordRegex);
        console.log(rPassword);
        if(!passwordRegex.test(rPassword))
        {
            response.code = 3;
            response.msg = "Unsafe password";
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({ email: rEmail},'_id');
        if(userAccount == null){
            // Create a new account
            console.log("Create new account...")

            // Generate a unique access token
            crypto.randomBytes(32, function(err, salt) {
                if(err){
                    console.log(err);
                }

                argon2i.hash(rPassword, salt).then(async (hash) => {
                    var newAccount = new Account({
                        email : rEmail,
                        password : hash,
                        name: rName,
                        age: rAge, 
                        schoolyear: rSchoolYear,
                        school: rSchool,

                        salt: salt,
        
                        lastAuthentication : Date.now()
                    });
                    await newAccount.save();

                    response.code = 0;
                    response.msg = "Account found";
                    response.data = ( ({email}) => ({ email }) )(newAccount);
                    res.send(response);
                    return;
                });
            });
        } else {
            response.code = 2;
            response.msg = "Email is already taken";
            res.send(response);
        }
        
        return;
    });
}