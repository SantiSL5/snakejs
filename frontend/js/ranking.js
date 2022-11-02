"use strict";

document.addEventListener('DOMContentLoaded', function () {
    let options = document.getElementsByClassName("menu_option");
    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', menuHighScore);
    }
}, false);

function menuHighScore() {
    let difficulty=document.getElementById("difficulty").value;
    let mode=document.getElementById("mode").value;

    getHighScore({
        "username":getUser(),
        "difficulty":difficulty,
        "mode":mode
    }).then(hs => {
        document.getElementById("menuHS").innerHTML=hs.highScore;
    });
}