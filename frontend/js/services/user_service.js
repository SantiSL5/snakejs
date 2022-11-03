"use strict";

async function getUsers(data = {}) {
    const response = await fetch("http://localhost:3030/api/user", {
        method: 'GET',
        mode: 'cors'
    });
    let res = await response.json();
    return Promise.resolve(res);
}

async function addUser(data = {}) {
    const response = await fetch("http://localhost:3030/api/user/adduser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors'
    });
    let res = await response.json();
    return res;
}

async function login(data = {}) {
    const response = await fetch("http://localhost:3030/api/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors'
    });
    let res = await response.json();
    return res;
}

async function getProfileImage() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 905);
    const response = await fetch(url, {
        method: 'GET',
    });
    let resjson = await response.json();
    let res = resjson['sprites']['other']['official-artwork']['front_default'];
    return res;
}