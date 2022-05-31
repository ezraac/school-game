/*****************************************************
  Written by Ezra Chai Term 2 2021
  Program for popBall game.
*****************************************************/
var time = 0;
var buttonfunc = "start";

//ball variables
const DIA = 50;
const BALLCOUNT = 10;
const BALLSPEED = [5, 4, 3, 2, -2, -3, -4, -5]; //8 different velocities
var ballarray = [];

//other variables - called in game_manager.js - only here for tidiness
var hitscore = 0;
var misses = 0;
var ballhit;
var misshit; //bool - changed to true/false when mouse is/isn't over canvas

function balls() {
	for (var i = 0; i < BALLCOUNT; i++) { 
		ballarray[i] = {
			//positioning and speed set to random values
			x: random(230, 270),
			y: random(230, 270),
			xspeed: random(BALLSPEED),
			yspeed: random(BALLSPEED),
			
			//creates the balls
			display: function() {
				stroke(255);
				noFill();
				ellipse(this.x, this.y, DIA);
			},

			//bounce function - reverses velocity if ball hits the edge
			bounce: function() { 
				if (this.x + DIA/2 > width) { 
					this.xspeed = -this.xspeed	//reverses speed
					this.x = width-DIA/2; //position ball inside canvas
				} else if (this.x - DIA/2 < 0) {
					this.xspeed = -this.xspeed;
					this.x = 0+DIA/2;
				}
				
				if (this.y + DIA/2 > height) {//y axis
					this.yspeed = -this.yspeed; //refer to x axis
					this.y = height-DIA/2;
				} else if (this.y - DIA/2 < 0) {
					this.yspeed = -this.yspeed;
					this.y = 0+DIA/2;
				}
			},

			//moves the balls
			move: function() {
				this.x = this.x + this.xspeed;
				this.y = this.y + this.yspeed;
			},

			//dist mouse to ball, returns true/false
			distance: function() {
				let px2ball = dist(this.x, this.y, mouseX, mouseY); //dist mouse 2 ball
				if (px2ball <= DIA/2) {
					return true
				} else {
					return false
				}
			}
		}
	}
}

function pBMouseFunc() {
	if (buttonfunc == "stop") {
		ballhit = false;
		for (var i = 0; i < ballarray.length; i++) { //iteration through balls
			let hit = ballarray[i].distance();
			if (hit == true) {
				hitscore += 1;
				ballhit = true;
				document.getElementById("hitscore").innerHTML = "Score: " + hitscore;
				console.log("mouseClicked: hit ball " + i);
				ballarray.splice(i, 1); //deletes object in array
				if (ballarray.length == 0) {
					clearInterval(pBInterval); //stops timer
					document.getElementById("gameStartButton").style.backgroundColor = "rgb(24, 230, 72)";
					document.getElementById("gameStartButton").innerHTML = "START"; //changes button to start button
					buttonfunc = "start";
					misses = 0;
				}
			}
		}
		if (ballhit == false) {
			misses += 1;
			document.getElementById("misses").innerHTML = "Misses: " + misses;
		} else {
			ballhit = false;
		}
	}
}
/*****************************************************/
//   END OF CODE
/*****************************************************/