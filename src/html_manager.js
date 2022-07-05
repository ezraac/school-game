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
    document.getElementById("username").innerHTML = "Username: " + userDetails.gameName;
    document.getElementById("hellouser").innerHTML = "Hello " + userDetails.name

    if (game == "PTB") {
        document.getElementById("misses") = 
    }
}