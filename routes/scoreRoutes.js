const mongoose = require('mongoose');
const Score = mongoose.model('scores');
const Session = mongoose.model('sessions');
module.exports = app => {

    app.post('/score/save', async (req, res) => {

        var response = {};

        const { rEmail, rTime, rScore, rMovesCount, rDifficulty } = req.body;

        // Create a new account
        console.log("Create new score...")

        // Generate a unique access token

        var newScore = new Score({
            email: rEmail,
            levelLength: rTime,
            score: rScore,
            movesCount: rMovesCount,
            difficulty: rDifficulty,

            timeStamp: Date.now()
        });
        await newScore.save();

        response.code = 0;
        response.msg = "Score created";
        response.data = (({ email }) => ({ email }))(newScore);
        res.send(response);
        return;

    }
    );

    app.post('/session/save', async (req, res) => {

        var response = {};

        const { rEmail, rDifficulty } = req.body;

        // Create a new account
        console.log("Create new session...")

        // Generate a unique access token

        var newSession = new Session({
            email: rEmail,
            difficulty: rDifficulty,
            timeStamp: Date.now()
        });
        await newSession.save();

        response.code = 0;
        response.msg = "Session created";
        response.data = (({ email }) => ({ email }))(newSession);
        res.send(response);
        return;
    });


    app.post('/score/getHigh', async (req, res) => {

        var response = {};

        const { rEmail, rDifficulty } = req.body;

        if (rEmail == null) {
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }

        var userScores = await Score.find({ email: rEmail, difficulty: rDifficulty } ).sort({ score: -1 }).limit(1);
        var userScore = userScores[0];
        if (userScore != null) {



            response.code = 0;
            response.msg = "Highscore found";
            console.log(userScore);
            userScore.movesCount
            response.data = (({ email, levelLength, score, movesCount }) => ({ email, levelLength, score, movesCount }))(userScore);
            console.log(response.data);
            res.send(response);

            return;
        }
        else {
            response.code = 1;
            response.msg = "Highscore not found";
            res.send(response);
            return;
        }
    });
}