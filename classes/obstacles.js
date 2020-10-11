class StalMite {
	constructor(h){
		this.height = h;
		this.x = 40
		this.body = createSprite(canvas.width/2 + 10,canvas.height/2 - h*(this.x/2),40,this.height * this.x);
		this.body.velocityX = -5;
		this.body.lifetime = canvas.width/10 + 20;
		this.body.visible = false;
	}

	display(){
		imageMode(CENTER);
		fill("red");
		for(var i = 20; i < this.height * this.x; i = i + 40){
			image(obsImg, this.body.x, 400 - i, 40, 40);
		}
	}
};

class StalTite {
	constructor(h){
		this.height = h;
		this.x = 40
		this.body = createSprite(canvas.width/2 + 10,(canvas.height + h*(this.x/2)) - canvas.height,40,this.height * this.x);
		this.body.velocityX = -5;
		this.body.lifetime = canvas.width/10 + 20;
		this.body.visible = false;
	}

	display(){
		imageMode(CENTER);
		fill("red");
		for(var i = 20; i < this.height * this.x; i = i + 40){
			image(obsImg, this.body.x, 0 + i, 40, 40);
		}
	}
};