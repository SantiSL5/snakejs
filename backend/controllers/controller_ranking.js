const fs = require('fs');

exports.getRankings = (req, res) => {
    fs.readFile("bbdd/ranking/ranking.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log(err);
        }
        res.send(jsonString);
    });
}

exports.addScore = (req, res) => {
    fs.readFile("bbdd/ranking/ranking.json", "utf8", (err, jsonString) => {
        jsonParsed=JSON.parse(jsonString);
        user=req.body.username;
        score=req.body.score;
        difficulty=req.body.difficulty;
        mode=req.body.mode;
        ranking=mode+"-"+difficulty;
        scoreNotFound=true;
        if (err) {
            console.log(err);
        }
        for (let i = 0; i < jsonParsed[ranking].length; i++) {
            if (jsonParsed[ranking][i].username==user) {
                scoreNotFound=false;
                if (jsonParsed[ranking][i].score<score && score > 0) {
                    jsonParsed[ranking][i].score=score;
                    data = JSON.stringify(jsonParsed);
                    fs.writeFileSync("bbdd/ranking/ranking.json", data);
                }
            }
        }
        if (scoreNotFound) {
            jsonParsed[ranking][jsonParsed[ranking].length]= {
                "username":user,
                "score":score
            }
            data = JSON.stringify(jsonParsed);
            fs.writeFileSync("bbdd/ranking/ranking.json", data);
        }
        res.send("ok");
    });
}

exports.getHighscore = (req, res) => {
    fs.readFile("bbdd/ranking/ranking.json", "utf8", (err, jsonString) => {
        jsonParsed=JSON.parse(jsonString);
        user=req.query.username;
        difficulty=req.query.difficulty;
        mode=req.query.mode;
        ranking=mode+"-"+difficulty;
        scoreNotFound=true;
        if (err) {
            console.log(err);
        }
        for (let i = 0; i < jsonParsed[ranking].length; i++) {
            if (jsonParsed[ranking][i].username==user) {
                scoreNotFound=false;
                res.send({"highScore":jsonParsed[ranking][i].score});
            }
        }
        if (scoreNotFound) {
            res.send({"highScore":0});
        }
    });
}

exports.getBestScore = (req, res) => {
    fs.readFile("bbdd/ranking/ranking.json", "utf8", (err, jsonString) => {
        jsonParsed=JSON.parse(jsonString);
        difficulty=req.query.difficulty;
        mode=req.query.mode;
        ranking=mode+"-"+difficulty;
        if (err) {
            console.log(err);
        }
        if (jsonParsed[ranking].length > 0) {
            jsonParsed[ranking].sort((a,b) => b.score - a.score);
            res.send({"bestScore":jsonParsed[ranking][0].score});
        }else {
            res.send({"bestScore":0});
        }
    });
}

exports.getRanking = (req, res) => {
    fs.readFile("bbdd/ranking/ranking.json", "utf8", (err, jsonString) => {
        jsonParsed=JSON.parse(jsonString);
        difficulty=req.query.difficulty;
        mode=req.query.mode;
        ranking=mode+"-"+difficulty;
        if (err) {
            console.log(err);
        }
        if (jsonParsed[ranking].length > 0) {
            jsonParsed[ranking].sort((a,b) => b.score - a.score);
            res.send(jsonParsed[ranking].slice(0,3));
        }else {
            res.send({"result":false});
        }
    });
}