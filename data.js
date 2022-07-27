/*****************************************************/
// database.js
// holds all database variables

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
  PTB_avgScore:0,
  PTB_TimeRec:0,
  gameName: '',
  TTT_Wins: 0,
  TTT_Losses:0,
};

var permissions = {
  userAuthRole: null,
}

var dbArray = [];
/*****************************************************/

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
//    END OF PROG
/*****************************************************/