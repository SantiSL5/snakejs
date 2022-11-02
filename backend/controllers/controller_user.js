const fs = require('fs');

exports.getUsers = (req, res) => {
    fs.readFile("bbdd/user/user.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log(err);
        }
        res.send(jsonString);
    });
}

exports.addUser = (req, res) => {
    fs.readFile("bbdd/user/user.json", "utf8", (err, jsonString) => {
        jsonParsed=JSON.parse(jsonString)
        usernameTaked=false;
        if (err) {
            console.log(err);
        }
        for (let i = 0; i < jsonParsed.users.length; i++) {
            if (jsonParsed.users[i].username == req.body.username) {
                usernameTaked=true;
            }
        }
        if (usernameTaked == true) {
            res.send({"result":"taked"});
        }else {
            jsonParsed.users[jsonParsed.users.length]= req.body;
            data = JSON.stringify(jsonParsed);
            fs.writeFileSync("bbdd/user/user.json", data);
            res.send({"result":"ok"});
        }
    });
}

exports.login = (req, res) => {
    fs.readFile("bbdd/user/user.json", "utf8", (err, jsonString) => {
        jsonParsed=JSON.parse(jsonString)
        userPosition=false;
        if (err) {
            console.log(err);
        }
        for (let i = 0; i < jsonParsed.users.length; i++) {
            if (jsonParsed.users[i].username == req.body.username) {
                userPosition=i;
            }
        }
        if (typeof userPosition == "boolean") {
            res.send({"result":"Username not exists"});
        }else {
            if (jsonParsed.users[userPosition].password == req.body.password) {
                res.send({"result":"logged"});
            }else {
                res.send({"result":"Password is incorrect"});
            }
        }
    });
}