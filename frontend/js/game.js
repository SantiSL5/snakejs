"use strict";
//Listen for play click

window.onload = function () {
    document.getElementById("play").addEventListener("click", start);
}

//Start values

let snake = [[6, 13]];
let axisVelocity = [1, 0];
let alive = true;
let animation = 0;
let acumulation = 4;
let blocks = [];
let apple = [];
let minx = 4;
let miny = 4;
let posiblePositions = [];
let score = 0;
let highScore = 0;
let bestScore = 0;
let deadText, canvas, canvasx, canvasy, size, maxx, maxy, ctx, playTimer, posNotEquals, forwardVel, forwardDir, backwardVel, backwardDir, eatStatus, newAxisVelocity, bone;
let lastTailForwardVelocity=[];

// Start the game
function start() {
    let difficulty=document.getElementById("difficulty").value;
    let mode=document.getElementById("mode").value;
    let item=document.getElementById("item").value;
    getHighScore({
        "username":getUser(),
        "difficulty":difficulty,
        "mode":mode
    }).then(hs => {
        highScore = hs.highScore;
        document.getElementById("yourhighscore").innerHTML = hs.highScore;
    });

    getBestScore({
        "username":getUser(),
        "difficulty":difficulty,
        "mode":mode
    }).then(bs => {
        bestScore = bs.bestScore;
        document.getElementById("bestscore").innerHTML = bs.bestScore;
    });
    if (difficulty == 2) {
        canvasx = 1350;
        canvasy = 990;
        size = 30;
    } else if ( difficulty == 1 ) {
        canvasx = 1360;
        canvasy = 1000;
        size = 40;
    } else {
        canvasx = 1350;
        canvasy = 1000;
        size = 50;
    }
    document.getElementById("canvas").width=canvasx;
    document.getElementById("canvas").height=canvasy;
    maxx = (canvasx/size) - 3;
    maxy = (canvasy/size) - 3;
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "visible";
    canvas = document.getElementById("canvas");
    canvas.style.visibility="visible";
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", pressKey);
    playTimer = setInterval(play, 1000/(6+(difficulty*4)));
    document.getElementById("yourscore").innerHTML = score;
}

//General function to display img
function imgDisplay(x, y, img) {
    let image=document.getElementById(img);
    ctx.drawImage(image, x * size - size, y * size - size, size, size);
}

//Function to display the bone when snake dies by eater
function boneDisplay(vel) {
    if (vel[0] == -1 && vel[1] == 0) {
        return "bone-l";
    }else if (vel[0] == 0 && vel[1] == -1) {
        return "bone-u";
    }else if (vel[0] == 1 && vel[1] == 0) {
        return "bone-r";
    }else if (vel[0] == 0 && vel[1] == 1) {
        return "bone-d";
    }
}

//Function to display snake tail
function tailDisplay(i) {
    forwardVel=[snake[i-1][0] - snake[i][0], snake[i-1][1] - snake[i][1]];
    if (forwardVel[0] == -1 && forwardVel[1] == 0) {
        imgDisplay(snake[i][0], snake[i][1], "tail-l");
    }else if (forwardVel[0] == 0 && forwardVel[1] == -1) {
        imgDisplay(snake[i][0], snake[i][1], "tail-u");
    }else if (forwardVel[0] == 1 && forwardVel[1] == 0) {
        imgDisplay(snake[i][0], snake[i][1], "tail-r");
    }else if (forwardVel[0] == 0 && forwardVel[1] == 1) {
        imgDisplay(snake[i][0], snake[i][1], "tail-d");
    }else {
        if (lastTailForwardVelocity[0] == -1 && lastTailForwardVelocity[1] == 0) {
            imgDisplay(snake[i][0], snake[i][1], "tail-l");
        }else if (lastTailForwardVelocity[0] == 0 && lastTailForwardVelocity[1] == -1) {
            imgDisplay(snake[i][0], snake[i][1], "tail-u");
        }else if (lastTailForwardVelocity[0] == 1 && lastTailForwardVelocity[1] == 0) {
            imgDisplay(snake[i][0], snake[i][1], "tail-r");
        }else if (lastTailForwardVelocity[0] == 0 && lastTailForwardVelocity[1] == 1) {
            imgDisplay(snake[i][0], snake[i][1], "tail-d");
        }
    }
    lastTailForwardVelocity=forwardVel;
}

//Function to display snake head and snake dead head when it colision with itself
function headDisplay(i, dead = false) {
    if (dead) {
        deadText="-dead"
    }else {
        deadText=""
    }
    forwardVel=axisVelocity;
    backwardVel=[snake[i][0] - snake[i+1][0], snake[i][1] - snake[i+1][1]];

    if (forwardVel[0] == -1 && forwardVel[1] == 0) {
        forwardDir = "l";
    }else if (forwardVel[0] == 0 && forwardVel[1] == -1) {
        forwardDir = "u";
    }else if (forwardVel[0] == 1 && forwardVel[1] == 0) {
        forwardDir = "r";
    }else if (forwardVel[0] == 0 && forwardVel[1] == 1) {
        forwardDir = "d";
    }

    if (backwardVel[0] == -1 && backwardVel[1] == 0) {
        backwardDir = "l";
    }else if (backwardVel[0] == 0 && backwardVel[1] == -1) {
        backwardDir = "u";
    }else if (backwardVel[0] == 1 && backwardVel[1] == 0) {
        backwardDir = "r";
    }else if (backwardVel[0] == 0 && backwardVel[1] == 1) {
        backwardDir = "d";
    }

    if ((forwardDir == "u" && backwardDir == "d") || (forwardDir == "d" && backwardDir == "u") || (forwardDir == "r" && backwardDir == "l") || (forwardDir == "l" && backwardDir == "r")) {
        backwardDir=forwardDir;
    }

    if (forwardDir == backwardDir) {
        if (forwardDir == "u" || backwardDir == "u") {
            imgDisplay(snake[i][0], snake[i][1], "head"+deadText+"-u");
        }else if (forwardDir == "d" || forwardDir == "d") {
            imgDisplay(snake[i][0], snake[i][1], "head"+deadText+"-d");
        }else if (forwardDir == "r" || forwardDir == "r") {
            imgDisplay(snake[i][0], snake[i][1], "head"+deadText+"-r");
        }else if (forwardDir == "l" || forwardDir == "l") {
            imgDisplay(snake[i][0], snake[i][1], "head"+deadText+"-l");
        }

    }else {

        if (dead) {
            if (backwardVel[0] == -1 && backwardVel[1] == 0) {
                backwardDir = "r";
            }else if (backwardVel[0] == 0 && backwardVel[1] == -1) {
                backwardDir = "d";
            }else if (backwardVel[0] == 1 && backwardVel[1] == 0) {
                backwardDir = "l";
            }else if (backwardVel[0] == 0 && backwardVel[1] == 1) {
                backwardDir = "u";
            }
        }
        imgDisplay(snake[i][0], snake[i][1], "head"+deadText+"-"+backwardDir+"-"+forwardDir);
    }
}

//Function to display body
function bodyDisplay(i) {
    forwardVel=[snake[i-1][0] - snake[i][0], snake[i-1][1] - snake[i][1]];
    backwardVel=[snake[i][0] - snake[i+1][0], snake[i][1] - snake[i+1][1]];
    if (forwardVel[0] == -1 && forwardVel[1] == 0) {
        forwardDir = "l";
    }else if (forwardVel[0] == 0 && forwardVel[1] == -1) {
        forwardDir = "u";
    }else if (forwardVel[0] == 1 && forwardVel[1] == 0) {
        forwardDir = "r";
    }else if (forwardVel[0] == 0 && forwardVel[1] == 1) {
        forwardDir = "d";
    }

    if (backwardVel[0] == -1 && backwardVel[1] == 0) {
        backwardDir = "l";
    }else if (backwardVel[0] == 0 && backwardVel[1] == -1) {
        backwardDir = "u";
    }else if (backwardVel[0] == 1 && backwardVel[1] == 0) {
        backwardDir = "r";
    }else if (backwardVel[0] == 0 && backwardVel[1] == 1) {
        backwardDir = "d";
    }

    if ((forwardDir == "u" && backwardDir == "d") || (forwardDir == "d" && backwardDir == "u") || (forwardDir == "r" && backwardDir == "l") || (forwardDir == "l" && backwardDir == "r")) {
        backwardDir=forwardDir;
    }

    if (forwardDir == backwardDir) {
        if (forwardDir == "u" || forwardDir == "d") {
            imgDisplay(snake[i][0], snake[i][1], "body-v");
        }else if (forwardDir == "r" || forwardDir == "l") {
            imgDisplay(snake[i][0], snake[i][1], "body-h");
        }
    }else {
        backwardVel=[snake[i+1][0] - snake[i][0], snake[i+1][1] - snake[i][1]];
        if (backwardVel[0] == -1 && backwardVel[1] == 0) {
            backwardDir = "l";
        }else if (backwardVel[0] == 0 && backwardVel[1] == -1) {
            backwardDir = "u";
        }else if (backwardVel[0] == 1 && backwardVel[1] == 0) {
            backwardDir = "r";
        }else if (backwardVel[0] == 0 && backwardVel[1] == 1) {
            backwardDir = "d";
        }

        if (forwardDir == "u" || forwardDir == "d") {
            imgDisplay(snake[i][0], snake[i][1], "curve-"+forwardDir+"-"+backwardDir);
        }else if (backwardDir == "u" || backwardDir == "d") {
            imgDisplay(snake[i][0], snake[i][1], "curve-"+backwardDir+"-"+forwardDir);
        }
    }
}

//Function to display apple on the posible positions
function createApple() {
    posiblePositions.length=0;
    for (let i = minx; i < maxx+1; i++) {
        for (let j = miny; j < maxy+1; j++) {
            posNotEquals=true
            for (let k = 0; k < snake.length; k++) {
                if (snake[k][0] == i && snake[k][1] == j) {
                    posNotEquals=false;
                }
            }
            for (let k = 0; k < blocks.length; k++) {
                if (blocks[k][0] == i && blocks[k][1] == j) {
                    posNotEquals=false;
                }
            }
            if (posNotEquals) {
                posiblePositions.push([i, j]);
            }
        }
    }
    let firstvalue=Math.floor(Math.random() * posiblePositions.length);
    apple.push(posiblePositions[firstvalue]);
    if (mode.value==2) {
        posiblePositions.splice(firstvalue,1);
        apple.push(posiblePositions[Math.floor(Math.random() * posiblePositions.length)]);
    } 
}

//Function to check if an apple has been eated
function appleFunction() {
    if (apple.length >= 1) {
        for (let i = 0; i < apple.length; i++) {
            if (snake[0][0] + axisVelocity[0] == apple[i][0] && snake[0][1] + axisVelocity[1] == apple[i][1]) {
                acumulation = acumulation + 1 + (difficulty.value * 1);
                score++;
                document.getElementById("yourscore").innerHTML = score;
                if (score >= highScore) {
                    document.getElementById("yourhighscore").innerHTML = score;
                }
                if (score >= bestScore) {
                    document.getElementById("bestscore").innerHTML = score;
                }
                if (mode.value==1 && score%(3-difficulty.value)==0) {
                    createBlock();
                }
                apple.splice(i,1);
            }else {
                imgDisplay(apple[i][0], apple[i][1], item.value);
            }
        }
    }else {
        createApple();
        for (let i = 0; i < apple.length; i++) {
            if (snake[0][0] + axisVelocity[0] == apple[i][0] && snake[0][1] + axisVelocity[1] == apple[i][1]) {
                acumulation = acumulation + 1 + (difficulty.value * 1);
                score++;
                document.getElementById("yourscore").innerHTML = score;
                if (score >= highScore) {
                    document.getElementById("yourhighscore").innerHTML = score;
                }
                if (score >= bestScore) {
                    document.getElementById("bestscore").innerHTML = score;
                }
                if (mode.value==1 && score%(3-difficulty.value)==0) {
                    createBlock();
                }
                apple.splice(i,1);
            }else {
                imgDisplay(apple[i][0], apple[i][1], item.value);
            }
        }
    }
}

function createBlock() {
    posiblePositions.length=0;
    for (let i = minx; i < maxx+1; i++) {
        for (let j = miny; j < maxy+1; j++) {
            posNotEquals=true
            if (snake[0][0] + 1 == i && snake[0][1] == j) {
                posNotEquals=false;
            }else if (snake[0][0] - 1 == i && snake[0][1] == j) {
                posNotEquals=false;
            }else if (snake[0][0] == i && snake[0][1] == j + 1) {
                posNotEquals=false;
            }else if (snake[0][0] - 1 == i && snake[0][1] == j) {
                posNotEquals=false;
            }else if (apple[0][0] == i && apple[0][1] == j) {
                posNotEquals=false;
            }else {
                for (let k = 0; k < blocks.length; k++) {
                    if (blocks[k][0] == i && blocks[k][1] == j) {
                        posNotEquals=false;
                    }
                }
                for (let k = 0; k < snake.length; k++) {
                    if (snake[k][0] == i && snake[k][1] == j) {
                        posNotEquals=false;
                    }
                }
            }
            if (posNotEquals) {
                posiblePositions.push([i, j]);
            }
        }
    }
    if (posiblePositions.length > 0) {
        blocks.push(posiblePositions[Math.floor(Math.random() * posiblePositions.length)]);
    }
}

function blocksDisplay() {
    for (let i = 0; i < blocks.length; i++) {
        imgDisplay(blocks[i][0], blocks[i][1], "bush");   
    }
}

//Function to detect the colision of the snake with itself
function checkColision() {
    let result=false;
    for (let i = 0; i < blocks.length; i++) {
        if (snake[0][0] + axisVelocity[0] == blocks[i][0] && snake[0][1] + axisVelocity[1] == blocks[i][1]) {
            result=true;
            for (let i = 0; i < snake.length; i++) {
                if (i == 0) {
                    headDisplay(i, true);
                }else if (i == snake.length - 1) {
                    tailDisplay(i);
                }else {
                    bodyDisplay(i);
                }
            }
        }
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0][0] + axisVelocity[0] == snake[i][0] && snake[0][1] + axisVelocity[1] == snake[i][1]) {
            result=true;
            for (let i = 0; i < snake.length; i++) {
                if (i == 0) {
                    headDisplay(i, true);
                }else if (i == snake.length - 1) {
                    tailDisplay(i);
                }else {
                    bodyDisplay(i);
                }
            }
        }
    }
    return result;
}

//Function to detect when the snake falls over the game area and spawn eater
function outOfBorder(actualAV, snakeDied) {
    ctx.fillStyle = "#2e889a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#5F4B43";
    ctx.fillRect(size*3, size*3, canvas.width - size*3*2, canvas.height - size*3*2);
    eatStatus=0;
    let eater=setInterval( () => {
        ctx.fillStyle = "#2e889a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#5F4B43";
        ctx.fillRect(size*3, size*3, canvas.width - size*3*2, canvas.height - size*3*2);
        switch (eatStatus) {
            case 0:
                let eater_open=document.getElementById("eater_open");
                ctx.drawImage(eater_open, (snakeDied[0][0] + actualAV[0] - 1) * size - size, (snakeDied[0][1] + actualAV[1] - 1) * size - size, size*3, size*3);
                snake.unshift([snake[0][0]+actualAV[0],snake[0][1]+actualAV[1]]);
                snake.pop()
                appleFunction();
                if (mode.value==1) {
                    blocksDisplay();
                }
                for (let i = 0; i < snake.length; i++) {
                    if (i == 0) {
                        headDisplay(i);
                    }else if (i == snake.length - 1) {
                        tailDisplay(i);
                    }else {
                        bodyDisplay(i);
                    }
                }
                eatStatus=1;
                break;
            case 1:
                let eater_closed=document.getElementById("eater_closed");
                ctx.drawImage(eater_closed, (snakeDied[0][0] - 1) * size - size, (snakeDied[0][1] + - 1) * size - size, size*3, size*3);
                snake.shift();
                appleFunction();
                if (mode.value==1) {
                    blocksDisplay();
                }
                for (let i = 0; i < snake.length; i++) {
                    if (i == 0) {
                        bone=boneDisplay(actualAV);
                        imgDisplay(snake[i][0], snake[i][1], bone);
                    }else if (i == snake.length - 1) {
                        tailDisplay(i);
                    }else {
                        bodyDisplay(i);
                    }
                }
                eatStatus=2;
                break;
            case 2:
                appleFunction();
                if (mode.value==1) {
                    blocksDisplay();
                }
                for (let i = 0; i < snake.length; i++) {
                    if (i == 0) {
                        bone=boneDisplay(actualAV);
                        imgDisplay(snake[i][0], snake[i][1], bone);
                    }else if (i == snake.length - 1) {
                        tailDisplay(i);
                    }else {
                        bodyDisplay(i);
                    }
                }
                endGame();
                clearInterval(eater);
                break;
        }
    }, 1000/9);
}

//Function of the game
function play() {
    ctx.fillStyle = "#2e889a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#5F4B43";
    ctx.fillRect(size*3, size*3, canvas.width - size*3*2, canvas.height - size*3*2);
    appleFunction();
    if (mode.value==1) {
        blocksDisplay();
    }
    if (checkColision()) {
        clearInterval(playTimer);
        endGame();
    }else{
        if (mode.value==2 && apple.length==1) {
            snake.unshift([snake[0][0]+axisVelocity[0],snake[0][1]+axisVelocity[1]]);
            snake.unshift([apple[0][0],apple[0][1]]);
            acumulation--;
            apple.pop();
        }else {
            snake.unshift([snake[0][0]+axisVelocity[0],snake[0][1]+axisVelocity[1]]);
        }
        if (acumulation > 0) {
            acumulation--;
        }else {
            snake.pop()
        }
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                headDisplay(i);
            }else if (i == snake.length - 1) {
                tailDisplay(i);
            }else {
                bodyDisplay(i);
            }
        }
    
        if (snake[0][0] > maxx || snake[0][0] < minx || snake[0][1] > maxy || snake[0][1] < miny) {
            outOfBorder(axisVelocity, snake);
            clearInterval(playTimer);
        }
    }
}

//Function to end the game, show the points of the player and restart the values
function endGame() {
    sumbitScore({
        "username":getUser(),
        "score":score,
        "difficulty":difficulty.value,
        "mode":mode.value
    }).then(res => {
        menuHighScore();
        menuRanking();
    });
    alert("You die, score: " + score);
    document.getElementById("score").style.visibility = "hidden";
    canvas = document.getElementById("canvas");
    canvas.style.visibility="hidden";
    document.getElementById("menu").style.visibility = "visible";
    snake = [[6, 13]];
    axisVelocity = [1, 0];
    alive = true;
    animation = 0;
    acumulation = 4;
    apple = [];
    posiblePositions = [];
    score = 0;
    blocks = [];
}

//Function to listen the event of press arrow keys or wasd  
function pressKey(evt) {
    switch (evt.key) {
        case "ArrowLeft":
            //left
            newAxisVelocity=[-1, 0];
            if (snake.length > 1 && snake[0][0] + newAxisVelocity[0] != snake[1][0] && snake[0][1] + newAxisVelocity[1] != snake[1][1]) {
                axisVelocity = [-1, 0];
            }
            break;
        case "ArrowUp":
            //up
            newAxisVelocity=[0, -1];
            if (snake.length > 1 && snake[0][0] + newAxisVelocity[0] != snake[1][0] && snake[0][1] + newAxisVelocity[1] != snake[1][1]) {
                axisVelocity = [0, -1];
            }
            break;
        case "ArrowRight":
            //right
            newAxisVelocity=[1, 0];
            if (snake.length > 1 && snake[0][0] + newAxisVelocity[0] != snake[1][0] && snake[0][1] + newAxisVelocity[1] != snake[1][1]) {
                axisVelocity = [1, 0];
            }
            break;
        case "ArrowDown":
            //down
            newAxisVelocity=[0, 1];
            if (snake.length > 1 && snake[0][0] + newAxisVelocity[0] != snake[1][0] && snake[0][1] + newAxisVelocity[1] != snake[1][1]) {
                axisVelocity = [0, 1];
            }
            break;
    }
}