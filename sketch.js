
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var ball;
var rightButton;
var leftButton; 
var ground;
var enemy; 
var collided = false;
var enemy_options;

function setup() {
  createCanvas(700,400);

  engine = Engine.create();
  world = engine.world;

  var ball_options = {
    isStatic : false, 
    restitution:0.3,
    friction:0,
    density:1.2,
  }
  ball = Bodies.circle(350, 275, 10, ball_options);
  World.add(world, ball);
  ground = Bodies.rectangle(0, height-100, 1400, 30, ground_options={isStatic: true});
  World.add(world, ground);
  //ball = new Ball(350, 50, 50);
  rightButton = createImg("up1.png");
  rightButton.position(360,330);
  rightButton.size(50, 50);
  rightButton.mouseClicked(right);

  leftButton = createImg("up2.png");
  leftButton.position(290,330);
  leftButton.size(50, 50);
  leftButton.mouseClicked(left);
  enemy = new Enemy(350, 0, 10, 50);
  World.add(world, enemy);
}


function draw() 
{
  background(51);
  Engine.update(engine);

//  console.log(ball.position.y)
  //ball.show();
  ellipse(ball.position.x,ball.position.y,50);
  rect(ground.position.x, ground.position.y, 700, 30);
  enemy.show();
/*
  if(Matter.SAT.collides(enemy.body, ball)==true){
    enemy.show()
  }
  */
  var pos = ball.position;
  var enemyPos = enemy.body.position;
  var distance = dist(enemyPos.x, enemyPos.y, pos.x, pos.y);

//  console.log(distance)
  if(distance <= 30) {
    console.log("HI")
    //enemy.show();
    //World.remove(world, enemy.body);
    enemy.remove();
    var newEnemy = new Enemy(20, 10, 20, 50, enemy_options);
    newEnemy.show();
    //enemy.show()
  }

  
}

function right() {
  Matter.Body.applyForce(ball, ball.position, {x:5, y:0});
}
function left() {
  Matter.Body.applyForce(ball, ball.position, {x:-5, y:0});

}
/*
class Ball {
  constructor(x, y, r) {
    let options = {
     isStatic : false,
     density : 1.2,
    }

    this.body = Bodies.circle(x, y, r, options);
    this.x = x;
    this.y = y;
    this.r = r;
   
    World.add(world, this.body);
  }
  show() {
    var pos = this.body.position;
    push();
   // circleMode(CENTER);
    ellipse(pos.x, pos.y, this.r);
    pop();
  }
}
*/

function keyPressed() 
{
  if(keyCode === RIGHT_ARROW){
    Matter.Body.applyForce(ball, ball.position, {x:5, y:0})
  }
  if(keyCode === LEFT_ARROW){
    Matter.Body.applyForce(ball, ball.position, {x:-5, y:0})
  }
}
class Enemy {
  constructor(x, y, w, h) {
    enemy_options = {
      isStatic : false
    }
    var EnemyPositions = [10, 100, 200, 400, 600, 700];
    var position = Math.random(EnemyPositions);
    this.body = Bodies.rectangle(position, y, w, h, enemy_options)
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }
  show() {
    var pos = this.body.position;
    push();
    rect(pos.x, pos.y, this.w, this.h);
    pop();
  }
  remove() {
    World.remove(world, this.body);
  }
}
/*
function collide(body1,sprite) 
{
if(body1!=null){
 var d = dist(body1.position, sprite.position);
 if(d<=80){
  return true;
 } 
 else {
   return false;
 }
}
}*/