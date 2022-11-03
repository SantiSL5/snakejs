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
    const response = await fetch("http://localhost:3030/api/ranking/hs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors'
    });
    let res=await response.json();
    return res;
}