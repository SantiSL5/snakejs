"use strict";

document.addEventListener('DOMContentLoaded', function () {
    let options = document.getElementsByClassName("menu_option");
    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', () => {
            menuHighScore();
            menuRanking();
        });
    }
}, false);

//Get your highscore of the current game mode and difficulty on menu
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

//Get ranking of the current game mode and difficulty on menu
function menuRanking() {
    let difficulty=document.getElementById("difficulty").value;
    let mode=document.getElementById("mode").value;

    getRanking({
        "difficulty":difficulty,
        "mode":mode
    }).then(ranking => {
        if (ranking.result == false) {
            document.getElementById("menuRanking").innerHTML="<p>No score yet</p>";
        } else {
            let html="";
            for (let i = 0; i < ranking.length; i++) {
                html=html+"<p>"+(i+1)+". "+ranking[i].username+": "+ ranking[i].score+"</p>";
            }
            document.getElementById("menuRanking").innerHTML=html;
        }
    });
}