"use strict";

async function sumbitScore(data = {}) {
    const response = await fetch("http://localhost:3030/api/ranking/addScore", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors'
    });
    await response;
}

async function getHighScore(data = {}) {
    const response = await fetch("http://localhost:3030/api/ranking/hs?" + new URLSearchParams(data), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    });
    let res=await response.json();
    return res;
}

async function getRanking(data = {}) {
    const response = await fetch("http://localhost:3030/api/ranking/?" + new URLSearchParams(data), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    });
    let res=await response.json();
    return res;
}