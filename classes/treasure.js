class Treasure {
	constructor(x, vY) {
		this.x = x;
		this.body = createSprite(this.x, 5, 30, 30);
		this.body.velocityY = vY;
		this.body.visible = false;
		this.body.setCollider("circle",0,0,30);
	}

	display() {
		imageMode(CENTER);
		image(treImg, this.body.x, this.body.y, 30, 30);
	}
};