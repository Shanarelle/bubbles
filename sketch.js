
var octo_image;
var octo;
var bubbles;
var canvas_width = 900;
var canvas_height = 580;
var paused = false;
var bubbles = [];


function setup() {
	var myCanvas = createCanvas(canvas_width, canvas_height);
	myCanvas.parent('canvasContainer');

	player = new Octopus(canvas_width/2, canvas_height/2);
	bubbles.push(new Bubble(createVector(100,100), createVector(1,1)));
}

function draw() {
	background('#07357f');

	bubbles.forEach(function(bubble, index, object) { 
		var kill = bubble.update() 
		if (kill) {
			object.splice(index, 1);
		}
	});

	player.update();
}


//////////////// GAME CONTROLS ///////////////////////

function keyTyped() {
  if (key === 'p') {
  	paused = !paused;
  	paused ? noLoop() : loop();
  	console.log(paused);
  }
  return false;
}


////////////////////// BUBBLE ///////////////////////////

function Bubble(position, startingVelocity) {
	this.position = position;
	this.velocity = startingVelocity;
	this.lifespan = random(1, 100);
	this.growthRate = 1.2;
	this.time = 0;
}

Bubble.prototype.update = function() {
	this.position = this.position.add(this.velocity);
	// this.velocity = this.velocity.mult(0.9);

	if (this.time < this.lifespan) {
		this.draw();
		this.time++;
	} else {
		this.pop();
		// if (this.time > this.lifespan+5) {
		// 	this.time++;
			return true;
		// }
	}
	return false;
}

//TODO: figure out whats wrong here. seems tied to current position of the fella
Bubble.prototype.draw = function() {
	push();
	fill('#A0DFF6');

	// translate(this.position.x, this.position.y);
	ellipse(this.position.x, this.position.y, (this.time*this.growthRate)+2, (this.time*this.growthRate)+2);

	pop();
}

Bubble.prototype.pop = function() {
	push();
	noFill();
	stroke('#596E76');

	// translate(this.position.x, this.position.y);
	ellipse(this.position.x, this.position.y, (this.time*this.growthRate)+2, (this.time*this.growthRate)+2);

	pop();
}


////////////////// FELLA /////////////////////////////

function Octopus(x, y) {
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
}

Octopus.prototype.update = function() {
	var changeforce = readInput();

	if (changeforce.mag() > 0) {
		possiblyCreateBubble(this.position.copy(), this.velocity.copy());

		this.velocity = this.velocity.add(changeforce);
		this.velocity = this.velocity.limit(10);
	}

	this.position = this.position.add(this.velocity);

	this.velocity = this.velocity.mult(0.9);

	this.draw();
}

Octopus.prototype.draw = function() {
	// console.log(this.velocity);

	var speed = this.velocity.mag();

	push();
	fill('#3232ba');

	translate(this.position.x, this.position.y);
	rotate(this.velocity.heading());
	ellipse(0, 0, (speed * 5) + 65, 50);
	fill('black');
	ellipse(speed + 12, -6, 12, 8);
	ellipse(speed + 12, 6, 12, 8);

	rotate(-this.velocity.heading());
	translate(-this.position.x, -this.position.y);
	pop();
}

function readInput() {
	var right = 0;
	var down = 0;
	if (keyIsDown(RIGHT_ARROW)) {
		right = 2;
	}
	if (keyIsDown(LEFT_ARROW)) {
		right = -2;
	}
	if (keyIsDown(DOWN_ARROW)) {
		down = 2;
	}
	if (keyIsDown(UP_ARROW)) {
		down = -2;
	}
	return createVector(right, down);
}

function possiblyCreateBubble(pos, vel) {
	if (random(10) < 8) {
		pos.add(createVector(random(-10,10), random(-10,10)));
		vel.rotate(PI);
		vel.mult(0.5);
		pos.add(createVector(random(-10,10), random(-10,10)));
		bubbles.push(new Bubble(pos, vel));
	}
}

// function Chick() {
// 	this.me = chick_image;
// 	this.velocity = createVector(random(-0.2,0.2),random(-0.2,0.2));
// 	this.position = createVector(random(width-50),random(height-50));
// 	this.box = {'x_min':0, 'x_max':canvas_width-20, 'y_min':0, 'y_max':canvas_height-28};
// }

// Chick.prototype.update = function() {
// 	var steer = random(-QUARTER_PI/4, QUARTER_PI/4);
// 	this.velocity.rotate(steer);

// 	if (steer < abs(0.1)) {
// 		if (this.velocity.mag() < 2.5) {
// 			this.velocity.mult(1.1);
// 		} else {
// 			this.velocity.mult(0.9);
// 		}
// 	} else {
// 		this.velocity.mult(0.8);
// 	}


// 	if(this.position.x < this.box.x_min || this.position.x > this.box.x_max) {
// 		this.velocity.rotate(HALF_PI)
// 	}
// 	if(this.position.y < this.box.y_min || this.position.y > this.box.y_max) {
// 		this.velocity.rotate(HALF_PI)
// 	}

// 	this.position.add(this.velocity);

// 	this.draw();
// }

// Chick.prototype.draw = function() {
// 	image(this.me, 
// 		this.position.x, 
// 		this.position.y, 
// 		20, 
// 		28);
// }