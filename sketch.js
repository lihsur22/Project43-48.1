const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bgImg;
var miner, grund, ledge;

function preload() {
  bgImg = loadImage("images/bg.png");
}

function setup() {
  var canvas = createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  miner = new Mine(50,canvas.height/2);
}

function draw() {
  background(bgImg);
  Engine.update(engine);

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
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW)
  {
	  Matter.Body.applyForce(miner.body2,miner.body2.position,{x:0,y:-20});
  }
}