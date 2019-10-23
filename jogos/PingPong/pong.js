const canvas = document.getElementById("pong");
const btnStatus = document.getElementById("btnStatus");//Id o botão de pausar
const context = canvas.getContext("2d");//Pega o conteudo do elemento, no caso, do canvas
let scoreP1 = document.getElementById("scoreP1");
let scoreCom = document.getElementById("scoreCom");

let paused = true;
let strikeStatus = false;

window.addEventListener('keydown', function(e){
    let key = e.keyCode;
     if(key === 80){
        pauseGame(true);
    }
    else if(key === 32){
        strikeStatus = true;
    }

    
});



///Efeitos sonoros dos jogos
let scoreFX = new Audio();
let ballFX = new Audio();
let pauseFX = new Audio();
let unpauseFX = new Audio();

scoreFX.src = "efeitos/score.mp3";
ballFX.src = "efeitos/ball.wav";
pauseFX.src = "efeitos/pausado.mp3";
unpauseFX.src = "efeitos/resumo.mp3";




///Objetos

const user = {
    x : 10,
    y : (canvas.height-100)/2 ,
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE"
}

const pc = {
    x : canvas.width - 20,
    y : (canvas.height-100)/2,
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE"
}

const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    width: 2,
    height: 10,
    color: "WHITE"
}

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius: 10,
    velocityX : 5,
    velocityY : 5,
    speed: 15,
    color: "ORANGE"
}



///Funções de regras de negócio

function pauseGame(statusGame){
    if(!paused || !statusGame){
        paused = true;
        status.innerHTML = "";
        btnStatus.innerHTML="Continuar";
        canvas.removeEventListener("mousemove",movePaddle);
        pauseFX.play();
    }
    else if(paused || statusGame){
        paused = false;
        status.innerHTML = "";
        btnStatus.innerHTML="Pausar";
        canvas.addEventListener("mousemove",movePaddle);
        unpauseFX.play();
    }
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = - ball.velocityX;
}


function collision(b,p){
    //p = player
    p.top = p.y;
    p.bottom = p.y+ p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    //b = ball
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius; 

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2 ;
}

function strike(){
    console.log("OK");
}

///Funções gráficas
  

function drawRect(x,y,w,h,cor){
    context.fillStyle = cor;
    context.fillRect(x,y,w,h);
}


function drawCircle(x,y,r,cor){

    context.fillStyle = cor;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}



function drawText(texto,x,y,cor){
    context.fillStyle = cor;
    context.font = "15px fantasy";
    context.fillText(texto,x,y);
}

function drawNet(){
    for(let i = 0; i<= canvas.height; i+=15){
        drawRect(net.x,net.y + i,net.width,net.height,net.color);
    }
}






///Funções para a criação de elementos na tela
function update(){
    if(ball.x - ball.radius <0){
        pc.score ++;
        scoreCom.innerHTML = pc.score;
        scoreFX.play();
        resetBall();
    }
    else if(ball.x + ball.radius > canvas.width){
        user.score++;
        scoreP1.innerHTML = user.score;
        scoreFX.play();
        resetBall();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;


    pc.y +=(ball.y - (pc.y + pc.height/2)) * 0.1;
    //user.y +=(ball.y - (user.y + user.height/2)) * 0.5;
    
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        
        ball.velocityY = - ball.velocityY;
        ballFX.play();
        if(strikeStatus === true){
            strike();
        }

    }
    //Identificar se é o jogador ou o pc
    let player = (ball.x < canvas.width/2) ? user : pc;


    if(user.y > (5*canvas.height/5) || user.y  < 10){
        user.y = -1;
    }

    if(collision(ball,player)){

        let collisionPoint = (ball.y - (player.y + player.height/2));
        
        collisionPoint /=  (player.height/2);

        let angulo = (Math.PI/4) * collisionPoint;

        let direction = (ball.x+ ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction *  ball.speed * Math.cos(angulo);
        ball.velocityY = direction * ball.speed * Math.sin(angulo);

        ball.speed +=1;
        ballFX.play();
    }

}


///Renderizador do jogo
function render_game(){

    drawRect(0,0,canvas.width,canvas.height, "#003380");
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(pc.x,pc.y,pc.width,pc.height,pc.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
    drawNet();
}

///Jogo
function game(){
    if(!paused){
        update();
    }
    render_game();
}

//Frames e taxa de atualização dos quadros do jogo
const frame = 65;

let game_loop = setInterval(game, 1000/frame);