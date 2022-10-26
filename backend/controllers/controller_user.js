const fs = require('fs');

exports.getUsers = (req, res) => {
    fs.readFile("bbdd/user/user.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log(err);
        }
        console.log(jsonString);
        res.json(jsonString);
    });
}