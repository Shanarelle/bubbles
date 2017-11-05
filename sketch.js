
var octo_image;
var octo;
var bubbles;
var canvas_width = 900;
var canvas_height = 580;
var paused = false;

// pre-fetch all required resources
// function preload() { 
//   player_image = loadImage('assets/');
// }


function setup() {
	var myCanvas = createCanvas(canvas_width, canvas_height);
	myCanvas.parent('canvasContainer');

	player = new Octopus(canvas_width/2, canvas_height/2);
}

function draw() {
	background('#07357f');

	player.update();

	// chicks.forEach(function(chick) { chick.update() });
}

function keyTyped() {
  if (key === 'p') {
  	paused = !paused;
  	paused ? noLoop() : loop();
  	console.log(paused);
  }
  return false;
}


function Octopus(x, y) {
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
}

Octopus.prototype.update = function() {
	var changeforce = readInput();

	if (changeforce.mag() > 0) {
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
	rotate(this.velocity.heading())
	ellipse(0, 0, (speed * 5) + 65, 50);
	fill('black');
	ellipse(speed + 12, -6, 12, 8);
	ellipse(speed + 12, 6, 12, 8);

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