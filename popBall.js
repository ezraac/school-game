/*****************************************************
  Written by Ezra Chai Term 2 2021
  Program for popBall game.
*****************************************************/
var time = 0;
var buttonfunc = "start";
const DIA = 24;
const BALLSPEED = [5, 4, 3, 2, -2, -3, -4, -5];
var ballarray = [];
var started = false;
var interval;

function setup() {
	cnv = createCanvas(600, 600);
	cnv.parent("gametwothird");
}

/*****************************************************/
// draw()
/*****************************************************/
function draw() {
	background(0);
	document.getElementById("gameTimer").innerHTML = "time: " + time + "s";
	for (var i = 0; i < ballarray.length; i++) {
		ballarray[i].display();
		ballarray[i].move();
		ballarray[i].bounce();
	}
}

function enterGame() {
	document.getElementById('landingPage').style.display = "none";
	document.getElementById('gamePage').style.display = "block";

	var element = document.getElementById("gametwothird");
	resizeCanvas(element.offsetWidth, element.offsetHeight);
}

/* function for the start button

when the start button is clicked, the elements will be changed to a stop button and the variable
buttonfunc will get changed to stop so repeated actions of clicking the button won't break the button. the
function "balls" will then be called to start the game.*/

/* when the stop button/when the button func is stop when the player clicks the button, the game will be stopped by splicing all the objects out of the array. the button is changed back to start and the buttonfun will be changed back to start. */
function gameStart() {
	if (started == false) {
		started = true;
		time = 0;
		console.log("started");
		if (buttonfunc == "start") {
			document.getElementById("gameStartButton").style.backgroundColor = "red";
			document.getElementById("gameStartButton").innerHTML = "stop";
			buttonfunc = "stop";
			balls();
			interval = setInterval(nextSecond, 1000);
		}
	} else {
		started = false;
		if (buttonfunc == "stop") {
			document.getElementById("gameStartButton").style.backgroundColor = "green";
			document.getElementById("gameStartButton").innerHTML = "start";
			buttonfunc = "start";
			ballarray.splice(0, ballarray.length);
			started = false;
			clearInterval(interval);
		}
	}
}

/* default function for mouse clicked. except i've added my own code so that when the mouse is clicked, it will check if the player clicked the ball */
function mouseClicked() {
  console.log("mouseClicked");
	for (var i = 0; i < ballarray.length; i++) {
		var px2ball = dist(ballarray[i].x, 
			ballarray[i].y, mouseX, mouseY);
		if (px2ball <= DIA/2) {
			hitscore += 1;
      console.log("mouseClicked: hit ball " + i);
      ballarray.splice(i, 1);
		}
	}
}

function nextSecond() {
	time++;
}

function balls() {
	for (var i = 0; i < 10; i++) {
		ballarray[i] = {
			x: random(230, 270),
			y: random(230, 270),
			xspeed: random(BALLSPEED),
			yspeed: random(BALLSPEED),
			
			display: function() {
				stroke(255, 255, 255);
				noFill();
				ellipse(this.x, this.y, DIA);
			},

			bounce: function() {
				if (this.x + DIA/2 > width) {
					this.xspeed = -this.xspeed
					this.x = width-DIA/2;
				} else if (this.x - DIA/2 < 0) {
					this.xspeed = -this.xspeed;
					this.x = 0+DIA/2;
				}
				
				if (this.y + DIA/2 > height) {
					this.yspeed = -this.yspeed;
					this.y = height-DIA/2;
				} else if (this.y - DIA/2 < 0) {
					this.yspeed = -this.yspeed;
					this.y = 0+DIA/2;
				}
			},

			move: function() {
				this.x = this.x + this.xspeed;
				this.y = this.y + this.yspeed;
			}
		}
	}
}

/*****************************************************/
//   END OF CODE
/*****************************************************/