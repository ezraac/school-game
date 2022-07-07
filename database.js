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
  age:      '',
  sex:      '',
  PTB_TimeRec:0,
  gameName: '',
  TTT_Wins: 0,
  TTT_Losses:0,
};

var permissions = {
  userAuthRole: null,
}

var dbArray = [];
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/

/*****************************************************/
// login()
// Input event; called when user clicks LOGIN button
// Logs user into firebase using Google login
// Input:
// Return:
/*****************************************************/
function db_login() {
  fb_login(userDetails, permissions);
}

/*****************************************************/
// readAll()
// Input event; called when user clicks READ ALL button
// Read all firebase records
// Input:
// Return:
/*****************************************************/
function db_readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DBPATH, dbArray, fb_processAll);
}

/*****************************************************/
// readRec()
// Input event; called when user clicks READ A RECORD button
// Read a specific firebase record
// Input:
// Return:
/*****************************************************/
function db_readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DBPATH, userDetails.uid, userDetails, fb_processUserDetails);
}

/*****************************************************/
// writeRec()
// Input event; called when user clicks WRITE A RECORD button
// Write a record to firebase
// Input:
// Return:
/*****************************************************/
function db_writeRec() {
  console.log(userDetails.uid)
  if (userDetails.uid != '') {
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DBPATH, userDetails.uid, userDetails);
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