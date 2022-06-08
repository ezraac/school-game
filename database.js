const DBPATH = "userDetails"; //firebase path

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
  score:    ''
};

var dbArray = [];

function setup() {
  fb_initialise(); //connect to firebase
}

function login() {
  fb_login(userDetails);
}


function readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DETAILS, dbArray, _processAll);
}

function readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DETAILS, userDetails.uid, userDetails, _processData);
}



function writeRec() {
  if (userDetails.uid != '') {
    userDetails.score = Number(prompt("enter the user's score"));
    
    // CALL YOUR WRITE A RECORD FUNCTION    <=================
    fb_writeRec(DETAILS, userDetails.uid, userDetails);
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