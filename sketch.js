const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var bgImg;
var miner, grund;

function preload() {
  bgImg = loadImage("images/bg.png");
}

function setup() {
  var canvas = createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  miner = new Mine(20,360);
  grund = new Ground();
}

function draw() {
  background(bgImg);
  Engine.update(engine);

  miner.display();
}