class Mine {
	constructor(x, y){
		this.body1 = createSprite(x, y, 20, 20);
		this.body1.visible = false;

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
		

		rectMode(CENTER);
		fill("brown");
		stroke("white");
		rect(pos.x, pos.y, 20, 20);
		drawSprites();
	}
};