class Boulder {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 100;
        this.body = createSprite(this.x, this.y - (this.r/2));
        this.body.lifetime = 60;
        this.body.velocityY = 10;
        this.body.visible = false;
    }
    
    display(){
        var pos = this.body
        
        this.body.setCollider("circle",0,0,50);
            
        push();
		translate(pos.x, pos.y);
		rectMode(CENTER);
		strokeWeight(3);
		fill("brown");
		ellipse(0,0,this.r,this.r);
		pop();
    }
}