/****************************************************/
/*code to manage what game is shown in the p5 canvas*/
/****************************************************/
var whatGame;

function enterGamePB() {
	document.getElementById('landingPage').style.display = "none";
	document.getElementById('gamePage').style.display = "block";

	var element = document.getElementById("gametwothird2");
	resizeCanvas(element.offsetWidth, element.offsetHeight);
    whatGame = "popBall"
}

function enterGameTTT() {
	document.getElementById('landingPage').style.display = "none";
	document.getElementById('gamePage').style.display = "block";

	var element = document.getElementById("gametwothird2");
	resizeCanvas(element.offsetWidth, element.offsetHeight);
    whatGame = "ticTacToe"
}

function setup() {
	var element = document.getElementById("gametwothird2")
	cnv = createCanvas(element.offsetWidth, element.offsetHeight);
	cnv.parent("gametwothird2");
	cnv.position(element.offsetLeft, element.offsetTop);
}

function draw() {
    if (whatGame == "popBall") {
        background(0);
        document.getElementById("gameTimer").innerHTML = "Time: " + time + "s";
        for (var i = 0; i < ballarray.length; i++) {
            ballarray[i].display();
            ballarray[i].move();
            ballarray[i].bounce();
        }
    }
}

/* function for the start button
when the start button is clicked, the elements will be changed to a stop button and the variable
buttonfunc will get changed to stop so repeated actions of clicking the button won't break the button. the
function "balls" will then be called to start the game.*/

/* when the stop button/when the button func is stop when the player clicks the button, the game will be stopped by splicing all the objects out of the array. the button is changed back to start and the buttonfun will be changed back to start. */
function gameStart() {
	if (started == false) {
		started = true
		time = 0
		console.log("started");
		if (buttonfunc == "start") {
                if (whatGame == "popBall") {
                document.getElementById("gameStartButton").style.backgroundColor = "red"
                document.getElementById("gameStartButton").innerHTML = "STOP"
                buttonfunc = "stop"
                balls()
                interval = setInterval(nextSecond, 1000);
            }
		}
	} else {
		started = false
		if (buttonfunc == "stop") {
			document.getElementById("gameStartButton").style.backgroundColor = "rgb(24, 230, 72)"
			document.getElementById("gameStartButton").innerHTML = "START"
			buttonfunc = "start"
            if (whatGame == "popBall") {
                ballarray.splice(0, ballarray.length)
                started = false
                clearInterval(interval)
            }
		}
	}
}