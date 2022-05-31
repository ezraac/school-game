/*****************************************************
  Written by Ezra Chai Term 2 2021
  Program for popBall game.
*****************************************************/
var time = 0;
var buttonfunc = "start";

//ball variables
const DIA = 50;
const BALLSPEED = [5, 4, 3, 2, -2, -3, -4, -5]; //8 different velocities
var ballarray = [];

//other variables - called in game_manager.js - only here for tidiness
var hitscore = 0;
var misses = 0;
var ballhit;
var misshit; //bool - changed to true/false when mouse is/isn't over canvas

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
					this.xspeed = -this.xspeed	//reverses speed
					this.x = width-DIA/2; //adjusts ball so it won't cut outside of canvas before drawn.
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

			move: function() { //moves the balls
				this.x = this.x + this.xspeed;
				this.y = this.y + this.yspeed;
			}
		}
	}
}

function pBMouseFunc() {
	if (buttonfunc == "stop") {
		ballhit = false;
		for (var i = 0; i < ballarray.length; i++) { //iteration through balls
			let px2ball = dist(ballarray[i].x, ballarray[i].y, mouseX, mouseY); //finds distance of ball x,y to mouse x,y
			if (px2ball <= DIA/2) {	//iterates through all the circles and finds the distance between the current circle and mouse cursor
				hitscore += 1;
				ballhit = true;
				document.getElementById("hitscore").innerHTML = "Score: " + hitscore;
				console.log("mouseClicked: hit ball " + i);
				ballarray.splice(i, 1); //simple way to remove object in array
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