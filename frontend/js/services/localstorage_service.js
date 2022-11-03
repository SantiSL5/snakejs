"use strict";

function loginStorage(user) {
    localStorage.setItem('user', window.btoa(JSON.stringify(user)));
}

function getUser() {
    return JSON.parse(window.atob(localStorage.getItem('user'))).username;
}

function checkLogged() {
    if (localStorage.getItem('user')) {
        let localUser=JSON.parse(window.atob(localStorage.getItem('user')));
        login(localUser).then(user => {
            if (user.result == "logged") {
                document.getElementById("login").style.visibility = "hidden";
                document.getElementById("menu").style.visibility = "visible";
                document.getElementById("credentials").style.visibility = "visible";
                document.getElementById("score").style.visibility = "hidden";
                document.getElementById("username_credentials").innerHTML= localUser.username;
                menuHighScore();
                menuRanking();
                loginStorage(localUser);
            }else {
                document.getElementById("login").style.visibility = "visible";
                document.getElementById("menu").style.visibility = "hidden";
                document.getElementById("credentials").style.visibility = "hidden";
                document.getElementById("score").style.visibility = "hidden";
                localStorage.removeItem('user');
            }
        });
    } else {
        document.getElementById("login").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "hidden";
        document.getElementById("credentials").style.visibility = "hidden";
        document.getElementById("score").style.visibility = "hidden";
        localStorage.removeItem('user');
    }
}

function logout() {
    document.getElementById("login").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("canvas").style.visibility = "hidden";
    document.getElementById("credentials").style.visibility = "hidden";
    localStorage.removeItem('user');
}