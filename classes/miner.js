class Mine {
	constructor(x, y){
		this.body1 = createSprite(x, y, 20, 20);
		this.body1.visible = false;
		this.health = 3;

		var options = {
			'restitution':0,
			'friction':0,
			'density':1.0
		}

		this.body2 = Bodies.rectangle(x, y, 20, 20, options);
		World.add(world, this.body2);
	}
	
	display(){
		Matter.Body.setVelocity(this.body2,{x:0, y:this.body2.velocity.y});
		var pos = this.body2.position
		if(this.body2.position.y < 10)
		{
			this.body2.position.y += 7
			Matter.Body.setVelocity(this.body2,{x:0, y:0});
		}

		if(this.body2.position.x < 10)
		{
			this.body2.position.x += 7
			Matter.Body.setVelocity(this.body2,{x:0, y:this.body2.velocity.y});
		}

		this.body1.x = pos.x;
		this.body1.y = pos.y;

		imageMode(CENTER);
		if(this.health != 0)
		{
			for(var i = 1; i < this.health; i++){
				image(heartImg,pos.x + 1.5, pos.y + (25 * i), 30, 30);
			}
		}
		

		rectMode(CENTER);
		if(invinc == 0)
		{
			stroke("white");
			fill(165,42,42);
			rect(pos.x, pos.y, 20, 20);
		} else
		{
			stroke(255,255,255,50);
			fill(165,42,42,50);
			rect(pos.x, pos.y, 20, 20);
		}
		drawSprites();
	}
};