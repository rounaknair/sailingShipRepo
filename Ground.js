class Ground
{
constructor(x,y,w,h)
{
    var GroundOption=
    {
        isStatic:true,
    }
    this.body=Bodies.rectangle(x,y,this.w,this.h,GroundOption);
    this.w=w;
    this.h=h;
    World.add(world,this.body);
}
display()
{
    var pos=this.body.position;
    push();
    translate(pos.x,pos.y);
    fill("brown");
    rect(0,0,this.w,this.h);
    pop();
}
}