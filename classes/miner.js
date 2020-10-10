class Mine {
	constructor(x, y){
		this.body1 = createSprite(x, y, 50, 50);

		var options = {
			'restitution': 0,
			'friction': 0
		}
		this.body2 = Bodies.rectangle(x, y, 50, 50, options);
		World.add(world, this.body2);
	}
	
	display(){
		var pos = this.body2.position

		this.body1.x = pos.x;
		this.body1.y = pos.y;
		drawSprites();
	}
};