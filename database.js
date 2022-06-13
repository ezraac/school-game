/*****************************************************/
// Written by ???  2021
// v1 firebase DB testing write AND read to firebase
// v2 add Google login
/*****************************************************/
const PADDING  = 15;
const PANELW   = 130;
const NEXTLINE = 30;

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const DETAILS = "userInformation"      //<=============== INSERT YOUR FIREBASE PATH NAME HERE

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
  highscore:    ''
};

var dbArray = [];
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/

/*****************************************************/
// setup
/*****************************************************/
function setup() {
  fb_initialise();                     // connect to firebase
}

/*****************************************************/
// login()
// Input event; called when user clicks LOGIN button
// Logs user into firebase using Google login
// Input:
// Return:
/*****************************************************/
function login() {
  fb_login(userDetails);
}

/*****************************************************/
// readAll()
// Input event; called when user clicks READ ALL button
// Read all firebase records
// Input:
// Return:
/*****************************************************/
function readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DETAILS, dbArray, _processAll);
}

/*****************************************************/
// readRec()
// Input event; called when user clicks READ A RECORD button
// Read a specific firebase record
// Input:
// Return:
/*****************************************************/
function readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DETAILS, userDetails.uid, userDetails, _processData);
}

/*****************************************************/
// writeRec()
// Input event; called when user clicks WRITE A RECORD button
// Write a record to firebase
// Input:
// Return:
/*****************************************************/
function writeRec() {
  if (userDetails.uid != '') {
    userDetails.score = Number(prompt("enter the user's score"));
    
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DETAILS, userDetails.uid, userDetails);
	  console.log(userDetails)
  }
  else {
    dbScore     = '';
    writeStatus = '';
    loginStatus = 'not logged in';
  }
}

function _processData(dbData, _data) {
	console.log("processing data")
	userDetails.uid = dbData.uid
	userDetails.name = dbData.name
	userDetails.email = dbData.email
	userDetails.photoURL = dbData.photoURL
	userDetails.score = dbData.score
	console.log("finished processing data")
}

function _processAll(_data, dbData, dbKeys) {
	for (i=0; i < dbKeys.length; i++) {
		let key = dbKeys[i]
		_data.push({
			name: dbData[key].name,
			score: dbData[key].score
		})
	}
}

/*****************************************************/
//    END OF PROG
/*****************************************************/