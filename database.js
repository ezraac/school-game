/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const DBPATH = "userInformation";
const AUTHPATH = "authorizedUsers";

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
  highscore:'',
  username: '',
};

var dbArray = [];
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/

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
  fb_readAll(DBPATH, dbArray, _processAll);
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
  fb_readRec(DBPATH, userDetails.uid, userDetails, _processData);
}

/*****************************************************/
// writeRec()
// Input event; called when user clicks WRITE A RECORD button
// Write a record to firebase
// Input:
// Return:
/*****************************************************/
function writeRec() {
  console.log(userDetails.uid)
  if (userDetails.uid != '') {
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DBPATH, userDetails.uid, userDetails);
	  console.log(userDetails)
  }
  else {
    dbScore     = '';
    writeStatus = '';
    loginStatus = 'not logged in';
  }
}



/*****************************************************/
//    END OF PROG
/*****************************************************/