window.onload = function () {
    canvas = document.getElementById("canvas");
    cursor = canvas.getContext("2d");
    document.addEventListener("keydown", pressKey);
    playTimer = setInterval(play, 1000/15);
}

let snake = [[20, 18],[21, 18]];
let axisVelocity = [1, 0];
let alive = true;
let animation = 0;
let acumulation = 1;

function vectorDisplay(x, y, color = "#000000") {
    cursor.fillStyle = color;
    cursor.fillRect(x * 20 - 20, y * 20 - 20, 20, 20);
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


function play() {
    cursor.fillStyle = "#2e889a";
    cursor.fillRect(0, 0, canvas.width, canvas.height);
    cursor.fillStyle = "#5F4B43";
    cursor.fillRect(60, 60, canvas.width - 120, canvas.height - 120);
    
    if (acumulation > 0) {
        newBody= [];
        // newBody.push(snake[snake.length - 1][0] - axisVelocity[0]);
        // newBody.push(snake[snake.length - 1][1] - axisVelocity[1]);
        // // snake.push([Number(snake[(snake.length - 1)][0] - axisVelocity[0]), Number(snake[(snake.length - 1)][1] - axisVelocity[1])]);
        // console.log(newBody);
        snake.push(newBody);
        snake.push(newBody);
        console.log(snake);
        acumulation--;
    }
    // console.log(lastbody)
    console.log(snake);
    for (let i = 0; i < snake.length; i++) {
    if (snake[snake.length-i]){
            console.log(snake.length-i)
            value=snake[snake.length-i-1]
            console.log(value)
            snake[snake.length-i] = value;
            // snake[i][0] += axisVelocity[0];
            // snake[i][1] += axisVelocity[1];
        }
    }
    console.log(snake);
    console.log(axisVelocity)
    snake[0][0] = snake[0][0] + axisVelocity[0];
    snake[0][1] = snake[0][1] + axisVelocity[1];
    console.log(snake);
    for (let i = 0; i < snake.length; i++) {
        vectorDisplay(snake[i][0], snake[i][1]);
    }
    clearInterval(playTimer);

    if (snake[0][0] > 63 || snake[0][0] < 4 || snake[0][1] > 33 || snake[0][1] < 4) {
        // outOfBorder(axisVelocity, snake);
        clearInterval(playTimer);
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