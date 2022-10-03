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
let apple = [];
let size = 30;
let minx = 4;
let miny = 4;
let maxx = 37;
let maxy = 27;
let posiblePositions = [];
let score = 0;

// Start the game
function start() {
    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "visible";
    canvas = document.getElementById("canvas");
    canvas.style.visibility="visible";
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", pressKey);
    playTimer = setInterval(play, 1000/9);
    document.getElementById("score").innerHTML = "Score: " + score;
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
    }
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
            if (posNotEquals) {
                posiblePositions.push([i, j]);
            }
        }
    }
    apple.push(posiblePositions[Math.floor(Math.random() * posiblePositions.length)]);
}

//Function to check if an apple has been eated
function appleFunction() {
    if (apple.length == 1) {
        if (snake[0][0] + axisVelocity[0] == apple[0][0] && snake[0][1] + axisVelocity[1] == apple[0][1]) {
            acumulation = acumulation + 5;
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
            apple.pop();
        }else {
            imgDisplay(apple[0][0], apple[0][1], "apple");
        }
    }else {
        createApple();
    }
}

//Function to detect the colision of the snake with itself
function checkColision() {
    let result=false;
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
                ctx.drawImage(eater_open, (snakeDied[0][0] + actualAV[0] - 1) * size - size, (snakeDied[0][1] + actualAV[1] - 1) * size - size, 90, 90);
                snake.unshift([snake[0][0]+actualAV[0],snake[0][1]+actualAV[1]]);
                snake.pop()
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
                ctx.drawImage(eater_closed, (snakeDied[0][0] - 1) * size - size, (snakeDied[0][1] + - 1) * size - size, 90, 90);
                snake.shift();
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
    if (checkColision()) {
        clearInterval(playTimer);
        endGame();
    }else{
        snake.unshift([snake[0][0]+axisVelocity[0],snake[0][1]+axisVelocity[1]]);
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

//Function to end the game and show the points of the player
function endGame() {
    alert("You die, score: " + score);
    document.getElementById("score").style.visibility = "hidden";
    canvas = document.getElementById("canvas");
    canvas.style.visibility="hidden";
    document.getElementById("play").style.visibility = "visible";
    snake = [[6, 13]];
    axisVelocity = [1, 0];
    alive = true;
    animation = 0;
    acumulation = 4;
    apple = [];
    size = 30;
    minx = 4;
    miny = 4;
    maxx = 37;
    maxy = 27;
    posiblePositions = [];
    score = 0;
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