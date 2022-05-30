/****************************************************/
/*code to manage what game is shown in the p5 canvas*/
/****************************************************/
var whatGame;
var pBInterval;
var started = false;
var hitscore = 0;
var misses = 0;
var ballhit;

//functions when enetering a game

//popball
function enterGame(chosenGame) {
	document.getElementById('landingPage').style.display = "none";
	document.getElementById('gamePage').style.display = "block";

	let element = document.getElementById("game_canvasDiv");
	resizeCanvas(element.offsetWidth, element.offsetHeight);
    whatGame = chosenGame;
}


//default p5.js functions

/*
default function called automatically by p5.js
creates a canvas and sets the parent to div "game_canvasDiv" and positions it over that same div.
*/
function setup() {
	let element = document.getElementById("game_canvasDiv")
	cnv = createCanvas(element.offsetWidth, element.offsetHeight); //sets width and height to same as div
	cnv.parent("game_canvasDiv");
	cnv.position(element.offsetLeft, element.offsetTop);
}

/*
default function draw
called after setup
any code inside it will be automatically executed continuously
amount of "draws" per second controlled by frame rate (defaulted to 60). to be left alone.
*/
function draw() {
    if (whatGame == "popBall") {
        background(0);
        document.getElementById("gameTimer").innerHTML = "Time: " + time + "s"; //timer text
        for (var i = 0; i < ballarray.length; i++) {
			//ball functions
            ballarray[i].display();
            ballarray[i].move();
            ballarray[i].bounce();
        }
    }
}

/*
mousepressed()
default function
code added for the popball game
*/
function mousePressed() {
	if (whatGame == "popBall") {
		pBMouseFunc();
	}
}

/* function for the start button
when the start button is clicked, the elements will be changed to a stop button and the variable
buttonfunc will get changed to stop so repeated actions of clicking the button with function 'start' won't break the button.
the function "balls" will then be called to start the game.*/

/* when the stop button/when the button func is stop when the player clicks the button,
the game will be stopped by splicing all the objects out of the array.
the button is changed back to start and the buttonfun will be changed back to start. */
function gameStart() {
	if (started == false) {
		started = true;
		time = 0;
		misses = 0;
		if (buttonfunc == "start") {
                if (whatGame == "popBall") {
                document.getElementById("game_startButton").style.backgroundColor = "red";
                document.getElementById("game_startButton").innerHTML = "STOP"; //changes button to stop button
                buttonfunc = "stop";
                balls() //creates balls
                pBInterval = setInterval(nextSecond, 1000); //starts timer
            }
		}
	} else {
		started = false
		if (buttonfunc == "stop") {
			document.getElementById("game_startButton").style.backgroundColor = "rgb(24, 230, 72)";
			document.getElementById("game_startButton").innerHTML = "START"; //changes button to start button
			buttonfunc = "start";
            if (whatGame == "popBall") {
                ballarray.splice(0, ballarray.length); //removes all balls in object
                started = false;
                clearInterval(pBInterval); //stop timer
            }
		}
	}
}

//next second - called by interval
function nextSecond() {
	time++;
}

