var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");

var activeValue = categoryActive.value; // to cheek if a cheeckbox is active

/**
 * the button create has this function when it is clicked
 */
document.querySelector("#create").addEventListener("click", function (event) {
    requestOne = new XMLHttpRequest();
    requestOne.open("POST", "../../API/v1/Category");
    requestOne.onreadystatechange = onRequstUpdate;
    if (activeValue == "on") {
        activeValue = false;
    } else {
        activeValue = true;
    }
    var sendJSON = {
        active: activeValue,
        name: categoryName.value
    }
    requestOne.send(JSON.stringify(sendJSON));
    onRequstUpdate();
});

/**
 * will be executed when the instance requestOne wants.
 * @returns if the message issnt loaded
 */
function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
}

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}