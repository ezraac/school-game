/*****************************************************/
// fb_io.js
// Written by Mr Bob 2020
// Edited and tailored by Ezra 2022
/*****************************************************/

/*****************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/*****************************************************/
function fb_initialise() {
  console.log('fb_initialise: ');

var firebaseConfig = {
	apiKey: "AIzaSyB_7NlTteTju303ogHgJ7wonvQsAqPHsy0",
	authDomain: "school-game-a9c5d.firebaseapp.com",
	databaseURL: "https://school-game-a9c5d-default-rtdb.firebaseio.com",
	projectId: "school-game-a9c5d",
	storageBucket: "school-game-a9c5d.appspot.com",
	messagingSenderId: "72283854922",
	appId: "1:72283854922:web:e636104a8d951a83522eb3",
	measurementId: "G-BYLNK1X8ZQ"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);	
		
  database = firebase.database();
}

/*****************************************************/
// fb_login(_dataRec)
// Called by setup
// Login to Firebase
// Input:  where to save the google data
// Return: n/a
/*****************************************************/
function fb_login(_dataRec) {
  console.log('fb_login: ');
  firebase.auth().onAuthStateChanged(newLogin);

  function newLogin(user) {
    if (user) {
      // user is signed in, so save Google login details
      _dataRec.uid      = user.uid;
      _dataRec.email    = user.email;
      _dataRec.name     = user.displayName;
      _dataRec.photoURL = user.photoURL;
      loginStatus = 'logged in';
      console.log('fb_login: status = ' + loginStatus);
      fb_readRec(DBPATH, userDetails.uid, userDetails, _processData);
	  reg_popUp(userDetails);
    } 
    else {
      // user NOT logged in, so redirect to Google login
      loginStatus = 'logged out';
      console.log('fb_login: status = ' + loginStatus);

      var provider = new firebase.auth.GoogleAuthProvider();
      //firebase.auth().signInWithRedirect(provider); // Another method
      firebase.auth().signInWithPopup(provider).then(function(result) {
        _dataRec.uid      = user.uid;
        _dataRec.email    = user.email;
        _dataRec.name     = user.displayName;
        _dataRec.photoURL = user.photoURL;
        loginStatus = 'logged in via popup';
        console.log('fb_login: status = ' + loginStatus);
        fb_readRec(DBPATH, userDetails.uid, userDetails, _processData);
		fb_writeRec(AUTHPATH, _dataRec.uid, 1);
		reg_popUp(userDetails);
      })
      // Catch errors
      .catch(function(error) {
        if(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          loginStatus = 'error: ' + error.code;
          console.log('fb_login: error code = ' + errorCode + '    ' + errorMessage);
        }
      });
    }
  }
}

/*****************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/*****************************************************/
function fb_writeRec(_path, _key, _data) { 
  console.log(`fb_WriteRec: path= ${_path} key= ${_key} data= ${_data.name} / ${_data.score}`);
	writeStatus = "waiting"
  firebase.database().ref(_path + "/" + _key).set(_data, function(error) {
	if (error) {
		writeStatus = "failure"
		console.log(error)
	}
	else {
		writeStatus = "ok"
	}
  });
	console.log("fb_writerec exit")
}

/*****************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/*****************************************************/
function fb_readAll(_path, _data, _processAll) {
  console.log('fb_readAll: path= ' + _path);

	readStatus = "waiting"
	firebase.database().ref(_path).once("value", gotRecord, readErr)

	function gotRecord(snapshot) {
		if (snapshot.val == null) {
			readStatus = "no record"
		}
		else {
			readStatus = "ok"
			var dbData = snapshot.val()
			console.log(dbData)
			var dbKeys = Object.keys(dbData)

			_processAll(_data, dbData, dbKeys)
		}
	}

	function readErr(error) {
		readData = "fail"
		console.log(error)
		_processAll(_data, dbData, dbKeys)
	}
}

/*****************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:  
/*****************************************************/
function fb_readRec(_path, _key, _data, _processData) {	
	console.log(_path, _key, _data, _processData)
    console.log('fb_readRec: path= ' + _path + '  key= ' + _key);

	readStatus = "waiting"
	firebase.database().ref(`${_path}/${_key}`).once("value", gotRecord, readErr)

	function gotRecord(snapshot) {
		let dbData = snapshot.val()
		console.log(dbData)
		if (dbData == null) {
			readStatus = "no record"
			_processData(dbData)
		}
		else {
			readStatus = "ok"
			_processData(dbData, _data)
		}
	}

	function readErr(error) {
		readStatus = "fail"
		console.log(error)
	}
}

function _processData(dbData, _data) {
	console.log("processing data")
	console.log(dbData)
	if (dbData == null) {
		reg_showPage();
	} else {
		userDetails.uid = dbData.uid
		userDetails.name = dbData.name
		userDetails.email = dbData.email
		userDetails.photoURL = dbData.photoURL
		userDetails.username = dbData.username
		userDetails.sex = dbData.sex
		userDetails.PTB_TimeRec = dbData.PTB_TimeRec
		userDetails.TTT_Wins = dbData.TTT_Wins
		userDetails.TTT_Losses = dbData.TTT_Losses

		console.log("finished processing data")
	}
}

function _processAll(_data, dbData, dbKeys) {
	for (i=0; i < dbKeys.length; i++) {
		let key = dbKeys[i]
		_data.push({
			name: dbData[key].name,
			highscore: dbData[key].highscore
		})
	}
}
/*****************************************************/
//    END OF MODULE
/*****************************************************/