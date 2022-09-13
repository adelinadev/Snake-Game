window.onload = function(){
    score = document.getElementById('score');
    document.addEventListener('keyDown', 
        function(event){
            changeDirection(e.keyCode)
            event.preventDefault()
        }
    )
    frame = setInterval(main, snake.speed)
}

let frame;
let score = 0;
let board = {
    w: 300, 
    h: 200, 
    score: 0};

let pixel = 5;



let cells = [
    {x: 0, y: 0},
    {x: 5, y: 0},
    {x: 10, y: 0},
    {x:15, y: 0}
]
let snake = {
    dir: 'right',
    head: {x:15, y: 0},
    speed: 120,
    x: pixel, 
    y: 0
}
let apple = {
    x: generateApple(0, board.w-pixel),
    y: generateApple(0, board.h-pixel),
}

function main(){
    clearBoard();
    drawSnake();
    checkCollisionSnake();
    moveSnake();
    drawCell(apple.x, apple.y)
}

function drawSnake(){
    for (cell of cells) {
        drawCell(cell.x, cell.y)
    }
}

function moveSnake() {
    snake.head = {
        x: cells[cells.length-1].x + snake.x,
        y: cells[cells.length-1].y + snake.y
    }
    cells.push(snake.head)
    if(snake.head.x ==apple.x)
    if(snake.head.y == apple.y)
    return false

    cells.shift()
}

function checkCollisionSnake(){
    if(apple.x == snake.head.x)
    if(apple.y == snake.head.y) {
        apple.x = generateApple(0, board.w-pixel)
        apple.y = generateApple(0, board.h-pixel)

        snake.speed -=5
        board.score +=10
        score.innerHTML = board.score;

        clearInterval(frame);
        frame = setInterval(main, snake.speed)
    }
    for(let i=0; i < cells.length-1; i++ ){
        if(cells[i].x == snake.head.x)
        if(cells[i].y == snake.head.y)
        gameOver(frame)
    }

    if(snake.head.x != board.w)
    if(snake.head.x != -pixel)
    if(snake.head.y != board.h)
    if(snake.head.y != -pixel){
        return false;
    }
    gameOver(frame)
}

function gameOver(frame){
    alert('Game over')
    clearInterval(frame)
}

function drawCell(x, y) {
    let c = document.getElementById('board');
    let ctx = c.getContext('2d')
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, pixel, pixel);
}

function changeDirection(keyPress){
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40

    switch(keyPress){
        case LEFT_KEY:
            if(snake.dir !== 'right'){
                snake.x = -pixel
                snake.y = 0
                snake.dir = 'left'
            }
            break;
        case RIGHT_KEY:
            if(snake.dir !== 'left'){
                snake.x = pixel
                snake.y = 0
                snake.dir = 'right'
            }
            break; 
        case UP_KEY:
            if(snake.dir !== 'down'){
                snake.x = 0
                snake.y = -pixel
                snake.dir = 'up'
            }
            break;
        case DOWN_KEY:
            if(snake.dir !== 'up'){
                snake.x = 0
                snake.y = pixel
                snake.dir = 'down'
            }
            break;       
    }
}

function clearBoard(){
    let c = document.getElementById('board');
    let ctx = c.getContext('2d')
    ctx.clearRect(0, 0, c.width, c.height)
}

function generateApple(min, max) {
    max = max/pixel
    var num = Math.random()*(max-min)+min
    num = Math.floor(num)*pixel
    return num;
}


