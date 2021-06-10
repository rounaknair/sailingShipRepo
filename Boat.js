class Boat
{
    constructor(x,y,w,h,boatPos,boatAnimation)
    {
    var boatOptions=
    {
        restitution:0.8,
        friction:1.0,
        density:1.0,
    }
    this.animation=boatAnimation;
    this.speed=0.05;
    this.body=Bodies.rectangle(x,y,w,h,boatPos,boatOptions);
    this.w=w;
    this.h=h;
    this.boatPos=boatPos;
    this.image=loadImage("./assets/boat.png");
    World.add(world,this.body);
    }
    
    display()
    {
        var index = floor(this.speed % this.animation.length);
        var pos=this.body.position;
        var angle=this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.boatPos,this.w,this.h);
        noTint();
        pop();
    }

    animates()
    {
        this.speed=this.speed+0.05 % 1.1;
    }

}