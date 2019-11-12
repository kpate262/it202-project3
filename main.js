var c = document.getElementById("animationCanvas");
var ctx = c.getContext("2d");

var earth = new Image();
var asteroid = new Image();
var ufo = new Image();
var background = new Image();

var life = new Image();
life.src = './earth.png';
var lives = [];

for(var i = 0; i < 5; i++){
  lives.push(life);
}


asteroid.src = './asteroid.png';
earth.src ='./earth.png';
ufo.src = './ufo.png';
background.src = './background.png';



var earthx = 0;
var earthy = 250;

var astx = 600;
var asty = 200;

var ufox = 600;
var ufoy = 400;

var imgOffset = 50;

var xlowerLimit = 450;
var xupperLimit = 50;

var lvl = 0;
var numLives = 0;

var seconds = 0;
var minute = 0;
var hour = 0;

var secondOffset = '0';
var minOffset = '0';
var hourOffset = '0';

function init(){
  secondOffset = '0';
  minOffset = '0';
  hourOffset = '0';
  seconds = 0;
  minute = 0;
  hour = 0;
  lvl = 0;
  numLives = 5;
  earthx = 0;
  earthy = 250;
  window.requestAnimationFrame(draw);
}

function gameOver(){

}

function setTimeText(){
  if (seconds >= 0 && seconds <= 9){
    secondOffset = '0' + seconds.toString();
  }
  else if (seconds >= 10 && seconds < 60){
    secondOffset = seconds.toString();
  }
  else if (seconds >= 60){
    seconds = 0;
    secondsOffset = '00';
    minute += 1;
  }


  if (minute >= 0 && minute <= 9){
    minOffset = '0' + minute.toString();
  }
  else if (minute >= 10 && minute < 60){
    minOffset = minute.toString();
  }
  else if (minute >= 60){
    minute = 0;
    minOffset = '00';
    hour += 1;
  }


  if (hour >= 0 && hour <= 9){
    hourOffset = '0' + hour.toString();
  }
  else if (hour >= 10 && hour < 60){
    hourOffset = hour.toString();
  }
  else{
    gameOver();
  }
}

function getTime(){
  seconds += 1;
  setTimeText();
}

$(document).keydown(function(e){
    if(e.key === "w" || e.key === "ArrowUp"){ if(earthy >= xupperLimit){ earthy -= 50; } }
    else if(e.key === "s" || e.key === "ArrowDown"){ if(earthy <= xlowerLimit){ earthy += 50; } }
    console.log(earthy);
});

function draw() {
  astx -= 1;
  ufox -= 1;

  if(astx < -80){
    astx = 600;
  }

  if(ufox < -50){
    ufox = 600;
  }

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(background, 0, 0);

  ctx.drawImage(earth, earthx, earthy);
  ctx.drawImage(asteroid, astx, asty);
  ctx.drawImage(ufo, ufox, ufoy);

  var lifex = 0;
  for(var j = 0; j < numLives; j++){
    ctx.drawImage(lives[j], lifex, 550);
    lifex += 53;
  }

  if(numLives === 0){
    gameOver();
  }

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Lvl: '+ lvl.toString(), 230, 50);

  window.setInterval(getTime(), 1000);

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(hourOffset + ':' + minOffset + ':' + secondOffset, 380, 595);
  window.requestAnimationFrame(draw);
}

init();
