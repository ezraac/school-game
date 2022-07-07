/*****************************************************/
// html_manager.js
// written by Ezra 2022
/*****************************************************/

function HTML_updateHTMLFromPerms() {
    console.log(permissions.userAuthRole)
    if (permissions.userAuthRole >= 2) {
        document.getElementById("lP_Admin").style.display = "block";
    } else {
        document.getElementById("lP_Admin").remove()
        
    }
}

function HTML_updateAdminPage(page) {
    switch(page) {
        case "ad_user":
            document.getElementById("b_adUser").style.backgroundColor = "cyan";
            document.getElementById("b_adHome").style.backgroundColor = "grey";
            document.getElementById("b_adPTB").style.backgroundColor   = "grey";
            break;
        
        case "ad_home":
            document.getElementById('gamePage').style.display    = "none";
            document.getElementById("landingPage").style.display   = "block";
            document.getElementById('s_adminPage').style.display = "none";
            break;
        case "ad_PTB":
            document.getElementById("b_adPTB").style.backgroundColor   = "cyan";
            document.getElementById("b_adUser").style.backgroundColor = "grey";
            document.getElementById("b_adHome").style.backgroundColor = "grey";
            break;
    }
}

function HTML_editGameInfo(game) {
    console.log(userDetails.gameName)
    document.getElementById("username").innerHTML = "Username: " + userDetails.gameName;
    document.getElementById("hellouser").innerHTML = "Hello " + userDetails.name

    if (game == "PTB") {
        document.getElementById("misses").innerHTML = "Misses: 0";
        document.getElementById("hitscore").innerHTML = "Score: 0";
        document.getElementById("highscore").innerHTML = "Fastest Time: " + userDetails.PTB_TimeRec;
        document.getElementById("game_timeDiv").style.display = "block";
    } else if (game == "TTT") {
        document.getElementById("hitscore").innerHTML = "Wins: " + userDetails.TTT_Wins;
        document.getElementById("highscore").innerHTML = "Losses: " + userDetails.TTT_Losses;
        document.getElementById("misses").innerHTML = "";
        document.getElementById("game_timeDiv").style.display = "none";
    }
}

function HTML_loadPage() {
    document.getElementById("landingPage").style.display = "block";
    document.getElementById("loadingText").style.display = "none"
}

function HTML_returnPage() {
    document.getElementById("landingPage").style.display = "block";
    document.getElementById("gamePage").style.display = "none";
}