const Engine= Matter.Engine;
const World= Matter.World;
const Bodies=Matter.Bodies;

const Constraint=Matter.Constraint;

let engine;
let world;

var tower;
var ground;
var cannon,angle;
var cannonball;

var balls=[];
var boat;
var boats=[];

var backImg;

var boatAnimation=[];
var boatSpriteData;
var boatSpriteImage;

function preload()
{
 backImg=loadImage("assets/background.gif");
 boatSpriteData=loadJSON("./assets/boat/ship-sailing.json");
 boatSpriteImage=loadImage("./assets/boat/ship-sailing.png");

}

function setup()
{
	createCanvas(1200,600);

	engine=Engine.create();
	world=engine.world;

	tower=new Tower(150,380,160,400);

	//ground=new Ground(200,490,500,30);

	angle= -PI/4;

	cannon=new Cannon(180,100,50,50,angle);

	cannonball=new CannonBall(cannon.x,cannon.y);

	boat=new Boat(width,height-100,200,200,-100);

	var boatFrame=boatSpriteData.frames;

	for(var i=0;i<boatFrame.length;i++)
	{
     var pos=boatFrame[i].position;
	 var img=boatSpriteImage.get(pos.x,pos.y,pos.w,pos.h);
	 boatAnimation.push(img);
	}

	rectMode(CENTER);
	ellipseMode(RADIUS);

}

function draw()
{
	background("grey");
    image(backImg,0,0,width,height);

    Engine.update(engine);
	tower.display();
	cannon.display();
    

    Matter.Body.setVelocity(boat.body,{x:-2,y:0});

	for(var i=0; i<balls.length; i++)
	{
		showCannonBall(balls[i],i);
	}

	for(var j=0;j<boats.length;j++)
	{
		if(balls[i] !== undefined && boats[j] !== undefined)
		{
         var collision=Matter.SAT.collides(balls[i].body,boats[j].body);
		 if(collision.collided)
		 {
		  boats[j].remove(j);
		  Matter.World.remove(world,balls[i].body);
		  balls.splice(i,1);
          i--;
		 }
		}
	}

	//ground.display();
	//cannonball.display();
	showBoats();
}

function keyPressed()
{
	if(keyCode===DOWN_ARROW)
	{
		var cannonball=new CannonBall(cannon.x,cannon.y);
		balls.push(cannonball);	
	}

	if(keyCode==DOWN_ARROW)
	{
    balls[balls.length-1].shoot();
	}
}

function showCannonBall(ball,index)
{
	ball.display();
	if(ball.body.position.x>width || ball.body.position.y>height-50)
	{
     Matter.World.remove(world,ball.body);
	 balls.splice(index,1); 
	}
}



function showBoats()
{
 if(boats.length>0)
 {
	 if(boats.length<4 && boats[boats.length-1].body.position.x < width-300)
	 {
      var positions=[-40,-60,-70,-20];
	  var position=random(positions);
	  var boat=new Boat(width,height-100,200,200,position,boatAnimation);
	  boats.push(boat);
	 }
for(var i=0;i<boats.length;i++)
{
Matter.Body.setVelocity(boats[i].body,{x:-4,y:0});
boats[i].display();
boats[i].animates();
}
 }
else
{
var boat=new Boat(width,height-60,170,170,-60,boatAnimation);
boats.push(boat);
}
}