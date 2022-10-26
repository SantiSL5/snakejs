const fs = require('fs');

exports.getRankins = (req, res) => {
    fs.readFile("bbdd/ranking/ranking.json", "utf8", (err, res) => {
        if (err) {
            console.log(err);
        }
        res.json(res);
    });
}