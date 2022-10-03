window.onload = function () {
    canvas = document.getElementById("canvas");
    cursor = canvas.getContext("2d");
    document.addEventListener("keydown", pressKey);
    playTimer = setInterval(play, 1000/10);
}

snake = [[20, 18]];
let axisVelocity = [1, 0];
let alive = true;
let animation = 0;
let acumulation = 5;
let apple = [];
let size = 30;
let minx = 4;
let miny = 4;
let maxx = 37;
let maxy = 37;
let posiblePositions = [];

function vectorDisplay(x, y, color = "#000000") {
    cursor.fillStyle = color;
    cursor.fillRect(x * size - size, y * size - size, size, size);
}

// function outOfBorder(actualAV, snakeDied) {
//     cursor.fillStyle = "#2e889a";
//     cursor.fillRect(0, 0, canvas.width, canvas.height);
//     cursor.fillStyle = "#5F4B43";
//     cursor.fillRect(60, 60, canvas.width - 120, canvas.height - 120);
//     for (let i = 0; i < snake.length; i++) {
//         snakeDied[i][0] += actualAV[0];
//         snakeDied[i][1] += actualAV[1];
//         vectorDisplay(snake[i][0], snake[i][1]);
//     }
// }

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
    console.log(posiblePositions);
    // console.log(posiblePositions[Math.floor(Math.random() * posiblePositions.length)]);
    apple.push(posiblePositions[Math.floor(Math.random() * posiblePositions.length)]);
    console.log(apple);
}

function appleFunction() {
    if (apple.length == 1) {
        if (snake[0][0] + axisVelocity[0] == apple[0][0] && snake[0][1] + axisVelocity[1] == apple[0][1]) {
            acumulation = acumulation + 5;
            apple.pop();
        }else {
            vectorDisplay(apple[0][0], apple[0][1], "red");
        }
    }else {
        createApple();
    }
    vectorDisplay(apple[0], apple[1], "red");
}

function checkColision() {
    let result=false;
    for (let i = 1; i < snake.length; i++) {
        if (snake[0][0] + axisVelocity[0] == snake[i][0] && snake[0][1] + axisVelocity[1] == snake[i][1]) {
            result=true;
            for (let i = 0; i < snake.length; i++) {
                if (i == 0) {
                    vectorDisplay(snake[i][0], snake[i][1], "darkred");
                }else {
                    vectorDisplay(snake[i][0], snake[i][1]);
                }
            }
        }
    }
    return result;
}


function play() {
    cursor.fillStyle = "#2e889a";
    cursor.fillRect(0, 0, canvas.width, canvas.height);
    cursor.fillStyle = "#5F4B43";
    cursor.fillRect(90, 90, canvas.width - 180, canvas.height - 180);
    // console.log(lastbody)
    appleFunction();
    if (checkColision()) {
        clearInterval(playTimer);
    }else{
        snake.unshift([snake[0][0]+axisVelocity[0],snake[0][1]+axisVelocity[1]]);
        if (acumulation > 0) {
            acumulation--;
        }else {
            snake.pop()
        }
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                vectorDisplay(snake[i][0], snake[i][1], "green");
            }else {
                vectorDisplay(snake[i][0], snake[i][1]);
            }
        }
    
        if (snake[0][0] > maxx || snake[0][0] < minx || snake[0][1] > maxy || snake[0][1] < miny) {
            // outOfBorder(axisVelocity, snake);
            clearInterval(playTimer);
        }
    }
}

function pressKey(evt) {
    switch (evt.keyCode) {
        case 37 || 65:
            //left
            if (axisVelocity[0] != 1 && axisVelocity[1] != 0) {
                axisVelocity = [-1, 0];
            }
            break;
        case 38 || 87:
            //up
            if (axisVelocity[0] != 0 && axisVelocity[1] != 1) {
                axisVelocity = [0, -1];
            }
            break;
        case 39 || 68:
            //right
            if (axisVelocity[0] != -1 && axisVelocity[1] != 0) {
                axisVelocity = [1, 0];
            }
            break;
        case 40 || 83:
            //down
            if (axisVelocity[0] != 0 && axisVelocity[1] != -1) {
                axisVelocity = [0, 1];
            }
            break;
    }
}