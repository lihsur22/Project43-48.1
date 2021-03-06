const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bgImg, obsImg, heartImg, treImg;
var miner, grund, ledge, s = [], t = [], b = [], c = [];
var gameState, time = 0, energy, invinc = 0, score = 0;
var stalling;
var fallSnd, coinColSnd, dmgSnd, startSnd, dieSnd, addLifeSnd, jumpSnd;

function preload() {
  bgImg = loadImage("images/bg.png");
  obsImg = loadImage("images/wall.png");
  heartImg = loadImage("images/heart.png");
  treImg = loadImage("images/treasure.png");

  soundFormats('ogg');
  fallSnd = loadSound("sounds/fall");
  coinColSnd = loadSound("sounds/snd_save1");
  dmgSnd = loadSound("sounds/snd_damage");
  startSnd = loadSound("sounds/snd_buy");
  dieSnd = loadSound("sounds/snd_die_splat");
  addLifeSnd = loadSound("sounds/snd_levelup");
  jumpSnd = loadSound("sounds/snd_bitget");
}

function setup() {
  var canvas = createCanvas(displayWidth/2 + 500,400);
  engine = Engine.create();
  world = engine.world;

  gameState = "rest";
  energy = 20;
}

function draw() {
  background(bgImg);
  Engine.update(engine);

  if(gameState == "rest")
  {
    textAlign(CENTER);
    textSize(80);
    stroke("black");
    fill(165,42,42);
    strokeWeight(5);
    text("Caving In", canvas.width/4,canvas.height/4 - 20);
    textSize(25);
    text("Press 'S' to start", canvas.width/4,canvas.height/4 + 50);

    rectMode(CENTER);
    fill(165,42,42,75);
    strokeWeight(2);
    rect(canvas.width/10,canvas.height/4,300,350);
    fill("white");
    textSize(15);
    text("Press UP ARROW to jump", canvas.width/10,50);
    text("Press RIGHT ARROW to move forward", canvas.width/10,125);
    text("Press LEFT ARROW to move backward", canvas.width/10,200);
    text("Press LEFT & RIGHT ARROW to glide", canvas.width/10,275);
    text("Gliding costs Energy", canvas.width/10,300);
    text("250 Score = +1 Health", canvas.width/10,360);

    if(keyIsDown(83))
    {
      startSnd.play();
      gameState = "play";
      miner = new Mine(50,canvas.height/4);
    }
  }




  if(gameState == "play")
  {
    miner.display();



    if(miner.body1.x > 0)
    {
      if(keyIsDown(37))
      {
        miner.body2.position.x -= 3
      }
      if(keyIsDown(39))
      {
        miner.body2.position.x += 3
      }
      if(keyIsDown(39) && keyIsDown(37) && Math.round(energy) > 0)
      {
        Matter.Body.setVelocity(miner.body2,{x:0, y:miner.body2.velocity.y/2});
        energy = energy - 0.08;
        stalling = 1;
      }
      if(!(keyIsDown(39) && keyIsDown(37)))
      {
        stalling = 0;
      }
    }

    //console.log(miner.body1.y);
		if(miner.body1.y > 500)
		{
      gameState = "over";
      dieSnd.play();
		}



    
    if(time < 25)
    {
      sumStal1(160, 4, 8);
      sumCoin(140);
      sumCoin(130);
    }
    else if(time >= 25 && time < 30)
    {
      sumStal1(0);
      sumCoin(10);
    }
    else if(time >= 30 && time < 60)
    {
      sumStal1(120, 6, 8);
      sumCoin(70);
    }
    else if(time >= 60 && time < 65)
    {
      sumStal1(0);
      sumCoin(17);
      sumCoin(13);
    }
    else if(time >= 65 && time < 90)
    {
      sumStal1(160, 2, 4);
      sumStal2(160, 2, 4);
      sumCoin(70);
    }
    else if(time >= 90 && time < 95)
    {
      sumStal1(0);
      sumStal2(0);
      sumCoin(0);
    }
    else if(time >= 95 && time < 125)
    {
      sumStal1(110, 2, 4);
      sumStal2(110, 2, 4);
      sumCoin(25);
    }
    else if(time >= 125 && time < 135)
    {
      sumStal1(0);
      sumStal2(0);
      sumCoin(0);
    }
    else if(time >= 135 && time < 200)
    {
      sumStal1(160, 3, 3);
      sumStal2(160, 3, 3);
      sumStal3(80, 5, 5);
      sumCoin(50);
    }
    else if(time >= 200 && time < 210)
    {
      sumStal1(0);
      sumStal2(0);
      sumCoin(0);
    }
    else if(time >= 210 && time < 270)
    {
      sumStal3(80, 4, 6);
      sumStal4(160, 4, 6);
      sumCoin(50);
    }
    else if(time >= 270 && time < 280)
    {
      sumStal3(0);
      sumStal4(0);
      sumCoin(0);
    }



    if((time >= 25 && time < 35))
    {
      sumBoul(60,true);
      sumBoul(4 * Math.round(random(2,5)),false);
    } else if((time >= 65 && time < 90))
    {
      sumBoul(60,false);
    } else if((time >= 90 && time < 95))
    {
      sumBoul(10 * Math.round(random(2,7)),true);
      sumBoul(30,false);
    } else if(time >= 95 && time < 120)
    {
      sumBoul(30,false);
    } else if(time >= 125 && time < 135)
    {
      sumBoul(30,false);
      sumBoul(90,true);
    } else if(time >= 170 && time < 200)
    {
      sumBoul(30,false);
    } else
    {
      sumBoul(0);
    }




    if(s.length > 0)
    {
      if(s[0].body.x < -10)
      {
        s.shift();
      }
    }
    if(t.length > 0)
    {
      if(t[0].body.x < -10)
      {
        t.shift();
      }
    }
    if(b.length > 0)
    {
      if(b[0].body.y > 400)
      {
        b.shift();
      }
    }
    if(c.length > 0)
    {
      if(c[0].body.y > 400)
      {
        c.shift();
      }
    }

    if(frameCount % 30 === 0 && frameCount > 0)
    {
      time += 1;
    }
    if(frameCount % 40 === 0 && frameCount > 0 && Math.round(energy) < 20 && stalling == 0)
    {
      energy += 1;
    }

    textAlign(CENTER);
    textSize(40);
    noStroke();
    fill(165,42,42,150);
    strokeWeight(5);
    text("Time : " + time, canvas.width/4,40);
    fill(255,0,0,51);
    text("Energy : " + Math.round(energy), canvas.width/4, 220);
    fill(255,0,0);
    textSize(14);
    text("Score : " + score, miner.body1.x, miner.body1.y - 20);

    if(invinc > 0)
    {
      invinc -= 1;
    }

    if(miner.health == 0)
    {
      gameState = "over";
      dieSnd.play();
    }

    if(score >= 250)
    {
      score = 0;
      miner.health += 1;
      addLifeSnd.play();
    }
  }





  if(gameState == "over")
  {
    fallSnd.stop();
    fallSnd.stop();
    fallSnd.stop();
    miner = undefined;
    s = [];
    t = [];
    b = [];
    c = [];

    textAlign(CENTER);
    textSize(80);
    stroke("black");
    fill(165,42,42);
    strokeWeight(5);
    text("YOU LOST", canvas.width/4,canvas.height/4 - 20);
    textSize(25);
    text("Press 'R' to restart", canvas.width/4,canvas.height/4 + 50);
    text("The time you survived for was : " + time, canvas.width/4,canvas.height/4 + 80);

    if(keyIsDown(82))
    {
      gameState = "rest";
      time = 0;
      frameCount = 0;
      score = 0;
      invinc = 0;
    }
  }
}






function keyPressed() {
  if(keyCode === UP_ARROW)
  {
    Matter.Body.applyForce(miner.body2,miner.body2.position,{x:0,y:-20});
    jumpSnd.play();
  }
  if(keyCode === 76)
  {
    time = 210;
  }
}

function sumStal1(a, MinH, MaxH) {
  if(frameCount % a == 0)
  {
    var ran = Math.round(random(MinH,MaxH));
    s.push(new StalMite(ran,-5))
  }
  if((frameCount % a) == a/2)
  {
    var ran = Math.round(random(MinH,MaxH));
    t.push(new StalTite(ran,-5))
  }

  for(var j = 0; j < t.length; j++){
    t[j].display();
    if(isTouching(miner.body1,t[j].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
  for(var i = 0; i < s.length; i++){
    s[i].display();
    if(isTouching(miner.body1,s[i].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
}

function sumStal2(a, MinH, MaxH) {
  if(frameCount % a == 0)
  {
    var ran = Math.round(random(MinH,MaxH));
    t.push(new StalTite(ran,-5))
  }
  if((frameCount % a) == a/2)
  {
    var ran = Math.round(random(MinH,MaxH));
    s.push(new StalMite(ran,-5))
  }

  for(var j = 0; j < t.length; j++){
    t[j].display();
    if(isTouching(miner.body1,t[j].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
  for(var i = 0; i < s.length; i++){
    s[i].display();
    if(isTouching(miner.body1,s[i].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
}

function sumStal3(a, MinH, MaxH) {
  if(frameCount % a == (3*a)/4)
  {
    var ran = Math.round(random(MinH,MaxH));
    t.push(new StalTite(ran,-5))
  }
  if((frameCount % a) == a/4)
  {
    var ran = Math.round(random(MinH,MaxH));
    t.push(new StalTite(ran,-5))
  }
  for(var i = 0; i < t.length; i++){
    t[i].display();
    if(isTouching(miner.body1,t[i].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
}

function sumStal4(a, MinH, MaxH) {
  if(frameCount % a == a)
  {
    var ran = Math.round(random(MinH,MaxH));
    s.push(new StalMite(ran,-15))
  }
  if((frameCount % a) == a/2)
  {
    var ran = Math.round(random(MinH,MaxH));
    s.push(new StalMite(ran,-15))
  }
  for(var i = 0; i < s.length; i++){
    s[i].display();
    if(isTouching(miner.body1,s[i].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
}

function sumBoul(a, followP) {
  if(frameCount % a == 0)
  {
    if(followP == false)
    {
      var ran = Math.round(random(canvas.width/16, (canvas.width/2 - canvas.width / 16) - 200));
      b.push(new Boulder(ran,0))
    }
    if(followP == true)
    {
      b.push(new Boulder(miner.body1.x,0))
    }
    fallSnd.play();
  }

  for(var i = 0; i < b.length; i++){
    b[i].display();
    if(isTouching(miner.body1,b[i].body) && miner.health != 0 && invinc == 0)
    {
      miner.health -= 1;
      invinc = 60;
      dmgSnd.play();
    }
  }
}

function sumCoin(a) {
  if(frameCount % a == 0)
  {
    var ran1 = miner.body1.x + random(-100,150);
    var ran2 = random(9,16);
    c.push(new Treasure(ran1,ran2))
  }
  for(var i = 0; i < c.length; i++){
    c[i].display();
    if(isTouching(miner.body1,c[i].body))
    {
      c[0].body.destroy();
      c.shift();
      score += 25;
      coinColSnd.play();
    }
  }
}