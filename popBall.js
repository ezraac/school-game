/*****************************************************
  Written by Ezra Chai Term 2 2021
  Program for popBall game.
*****************************************************/
var time = 0;
var hitscore = 0;
var buttonfunc = "start";
const DIA = 50;
const BALLSPEED = [5, 4, 3, 2, -2, -3, -4, -5];
var ballarray = [];
var interval;
var started = false;

function setup() {
	let element = document.getElementById("gametwothird2")
	cnv = createCanvas(element.offsetWidth, element.offsetHeight);
	cnv.parent("gametwothird2");
	cnv.position(element.offsetLeft, element.offsetTop);
}

/*
mouseclicked()
already a default function, only i've added my own set of code to make it work with my game.

*/
function mouseClicked() {
  console.log("mouseClicked");
	for (var i = 0; i < ballarray.length; i++) {
		var px2ball = dist(ballarray[i].x, 
			ballarray[i].y, mouseX, mouseY); //iterates through all the circles and finds the distance between the current circle-
		if (px2ball <= DIA/2) {				 //
			hitscore += 1
			document.getElementById("hitscore").innerHTML = "Score: " + hitscore
			console.log("mouseClicked: hit ball " + i);
			ballarray.splice(i, 1); //simple way to remove object in array
			if (ballarray.length == 0) {
				clearInterval(interval)
			}
		}
	}
}

function balls() {
	console.log("balls")
	for (var i = 0; i < 10; i++) { //10 balls
		ballarray[i] = {
			//positioning and speed set to random values
			x: random(230, 270),
			y: random(230, 270),
			xspeed: random(BALLSPEED),
			yspeed: random(BALLSPEED),
			
			display: function() { //creates the balls
				stroke(255);
				noFill();
				ellipse(this.x, this.y, DIA);
			},

			bounce: function() { //bounce function - reverses velocity if ball hits the edge
				if (this.x + DIA/2 > width) { //x axis
					this.xspeed = -this.xspeed
					this.x = width-DIA/2;
				} else if (this.x - DIA/2 < 0) {
					this.xspeed = -this.xspeed;
					this.x = 0+DIA/2;
				}
				
				if (this.y + DIA/2 > height) {//y axis
					this.yspeed = -this.yspeed;
					this.y = height-DIA/2;
				} else if (this.y - DIA/2 < 0) {
					this.yspeed = -this.yspeed;
					this.y = 0+DIA/2;
				}
			},

			move: function() { //moves the balls
				this.x = this.x + this.xspeed;
				this.y = this.y + this.yspeed;
			}
		}
	}
}

/*****************************************************/
//   END OF CODE
/*****************************************************/