"use strict";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn_login").addEventListener("click", loginForm);
    document.getElementById("btn_register").addEventListener("click", registerForm);
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("canvas").style.visibility = "hidden";
    document.getElementById("credentials").style.visibility = "hidden";
    checkLogged();
}, false);

function loginForm() {
    let username=document.getElementById("username_input").value;
    let password=document.getElementById("password_input").value;
    if (username != "" && password != "") {
        let user={
            "username":username,
            "password":password,
        };
        login(user).then(result => {
            if (result.result == undefined) {
                document.getElementById("login").style.visibility = "hidden";
                document.getElementById("menu").style.visibility = "visible";
                document.getElementById("credentials").style.visibility = "visible";
                loginStorage(user);
                document.getElementById("username_credentials").innerHTML = result.username;
                document.getElementById("image_credentials").src = result.img;
                menuHighScore();
            } else {
                alert(result.result);
            }
        });
    }else if (username == "" && password == "") {
        alert("Insert username and password");
    }else if (username == "") {
        alert("Insert username");
    }else if (password== "") {
        alert("Insert password");
    }
}

function registerForm() {
    let username=document.getElementById("username_input").value;
    let password=document.getElementById("password_input").value;
    if (username != "" && password != "") {
        getProfileImage().then(img =>{
            let user={
                "username":username,
                "password":password,
                "img": img
            }
            addUser(user).then(result => {
                if (result.result=="taked") {
                    alert("Username is already taked");
                } else if (result.result=="ok") {
                    alert("Account created");
                }
            });
        });

    }else if (username == "" && password == "") {
        alert("Insert username and password");
    }else if (username == "") {
        alert("Insert username");
    }else if (password== "") {
        alert("Insert password");
    }
}