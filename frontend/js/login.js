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


//Checks valid values from login form input
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

//Checks valid values from register form inputs
function registerForm() {
    let username=document.getElementById("username_input").value;
    let password=document.getElementById("password_input").value;
    if (username != "" && password != "" && new RegExp(/^.[0-9a-zA-Z]{2,16}$/).test(username) && new RegExp(/^.(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{7,32})/).test(password)) {
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
    }else if (!(new RegExp(/^.[0-9a-zA-Z]{2,15}$/).test(username))){
        alert("Insert a valid username, 3-15 characters");
    }else if (!(new RegExp(/^.(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{7,32})/).test(password))){
        alert("Insert a valid and strong password from 8 to 32 characters");
    }
}