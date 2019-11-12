var c = 0 ;
var ctx = 0;

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

var astSpeed = 1;
var ufoSpeed = 1;

var imgOffset = 50;

var ylowerLimit = 600;
var yupperLimit = 100;

var lvl = 0;
var numLives = 0;

var seconds = 0;
var minute = 0;
var hour = 0;

var secondOffset = '0';
var minOffset = '0';
var hourOffset = '0';

var score = 0;

const getrandomNum = () => {
  var min = 50;
  var max = 551
  var randomNum = Math.floor(Math.random() * (max - min + 1) ) + min;

  if (randomNum >= 50 && randomNum < 100){
    return 50;
  }
  else if (randomNum >= 100 && randomNum < 150){
    return 100;
  }
  else if (randomNum >= 150 && randomNum < 200){
    return 150;
  }
  else if (randomNum >= 200 && randomNum < 250){
    return 200;
  }
  else if (randomNum >= 250 && randomNum < 300){
    return 250;
  }
  else if (randomNum >= 300 && randomNum < 350){
    return 300;
  }
  else if (randomNum >= 350 && randomNum < 400){
    return 350;
  }
  else if (randomNum >= 400 && randomNum < 450){
    return 400;
  }
  else if (randomNum >= 450 && randomNum < 500){
    return 450;
  }
  else if (randomNum >= 500 && randomNum < 550){
    return 500;
  }
  else if (randomNum >= 550 && randomNum < 600){
    return 550;
  }
}

const init = () => {
  c = document.getElementById("animationCanvas");
  ctx = c.getContext("2d");
  score = 0;
  astSpeed = 1;
  ufoSpeed = 1;
  secondOffset = '0';
  minOffset = '0';
  hourOffset = '0';
  seconds = 0;
  minute = 0;
  hour = 0;
  lvl = 0;
  numLives = 5;
  astx = 600;
  asty = getrandomNum();
  ufox = 600;
  ufoy = getrandomNum();
  earthx = 0;
  earthy = getrandomNum();
  window.requestAnimationFrame(draw);
}

const gameOver = () => {
  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Game Over', c.width/4, c.height/2);
  ctx.font = "25px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Press Enter to start again.', c.width/4, (c.height/2 + 50));

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Lvl: '+ lvl.toString(), 5, yupperLimit-50);

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Score: '+ score.toString(), c.width-240, yupperLimit-50);

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(hourOffset + ':' + minOffset + ':' + secondOffset, 380, ylowerLimit+45);
  ctx = null;
}



const setTimeText = () => {
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


const getTime = () => {
  seconds += 1;
  setTimeText();
}

$(document).keydown(function(e){
    if(e.key === "w" || e.key === "ArrowUp"){ if(earthy >= yupperLimit){ earthy -= 50; } }
    else if(e.key === "s" || e.key === "ArrowDown"){ if(earthy < ylowerLimit-50){ earthy += 50; } }
    else if(e.key === "Enter") { if(ctx === null) { init(); } }
    console.log(earthy);
});

const draw = () => {
  if(lvl === 4){
    astSpeed = 2;
    ufoSpeed = 2;
  }
  else if (lvl === 6){
    astSpeed = 3;
    ufoSpeed = 3;
  }
  else if (lvl === 8){
    astSpeed = 4;
    ufoSpeed = 4;
  }
  else if (lvl === 10){
    astSpeed = 5;
    ufoSpeed = 5;
  }


  if(numLives != 0){
    astx -= astSpeed*(lvl + astSpeed);
    ufox -= ufoSpeed*(lvl + ufoSpeed);
  }
  else{
    gameOver();
  }

  if(earthy === asty && (astx >= -35 && astx <= 45)){
    astx = 600;
    asty = getrandomNum();
    if(asty === ufoy && Math.abs(astx - ufox) > 100){
      asty = getrandomNum();
    }
    numLives--;
  }

  if(earthy === ufoy && (ufox >= -45 && ufox <= 45)){
    ufox = 600;
    if(asty === ufoy && Math.abs(astx - ufox) > 100){
      ufoy = getrandomNum();
    }
    ufoy = getrandomNum();
    score++;
  }

  if(astx < -80){
    asty = getrandomNum();
    if(asty === ufoy && Math.abs(astx - ufox) > 100){
      asty = getrandomNum();
    }
    astx = 600;
  }

  if(ufox < -50){
    ufoy = getrandomNum();
    if(asty === ufoy && Math.abs(astx - ufox) > 100){
      ufoy = getrandomNum();
    }
    ufox = 600;
  }



  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(background, 0, 0);

  ctx.drawImage(earth, earthx, earthy);
  ctx.drawImage(asteroid, astx, asty);
  ctx.drawImage(ufo, ufox, ufoy);

  var lifex = 0;
  for(var j = 0; j < numLives; j++){
    ctx.drawImage(lives[j], lifex, ylowerLimit);
    lifex += 53;
  }

  if(numLives === 0){
    gameOver();
  }

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Lvl: '+ lvl.toString(), 5, yupperLimit-50);

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText('Score: '+ score.toString(), c.width-240, yupperLimit-50);

  window.setTimeout(getTime(), 1000);

  if (minute === 30 && hour === 0 && seconds === 1){
    lvl++;
  }
  else if (hour === 1 && minute === 0 && seconds === 1){
    lvl++;
  }
  else if (hour > 1 && minute === 0 && seconds === 1){
    lvl++;
  }

  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.fillText(hourOffset + ':' + minOffset + ':' + secondOffset, 380, ylowerLimit+45);
  window.requestAnimationFrame(draw);
}

init();
