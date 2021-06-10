class CannonBall
{
    constructor(x,y)
    {
     var cannonOptions=
     {
         friction:1.0,
         restitution:0.9,
         density:1.0,
     }
     this.r=20;
     this.body=Bodies.circle(x,y,this.r,cannonOptions);
     this.image=loadImage("assets/cannonball.png");
     this.trajectory= [] ;
     World.add(world,this.body);
    }

    display()
    {
    var pos=this.body.position;
    var angle=this.body.angle;
    push();
    translate(pos.x,pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image,0,0,50,50);
    pop();
    if(this.body.velocity.x>0 && this.body.position.x>300)
    {
    var position=[this.body.position.x,this.body.position.y];
    this.trajectory.push(position);
    }
    for(var i=0; i<this.trajectory.length; i++)
    {
        image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5);
    }

    } 

    shoot()
    {
     var velocity=p5.Vector.fromAngle(cannon.angle);
     velocity.mult(20); 
     Matter.Body.setStatic(this.body,false);
     Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y})
    }  

    remove(index)
    {
     Matter.World.remove(world,this.body);
     boats.splice(index,1);
    }
}