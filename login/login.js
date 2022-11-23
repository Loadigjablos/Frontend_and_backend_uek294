var username = document.querySelector("#name");
var passwd = document.querySelector("#passwd");
var statusText = document.querySelector("#status");

var requestOne;

/**
 * when the login is pressed. the user data from the two inputs tags will be sent in a JSON fromat
 */
document.querySelector("#login").addEventListener("click", function (event) {
    requestOne = new XMLHttpRequest();
    requestOne.open("POST", "../API/v1/Login");
    requestOne.onreadystatechange = onRequstUpdate;
    var loginJSON = {
        username: username.value,
        password: passwd.value
    }
    requestOne.send(JSON.stringify(loginJSON));
    onRequstUpdate();
});

/**
 * the button will redirect to the start index page
 */
document.querySelector("#back").addEventListener("click", function (event) {
    window.location = "../index.html";
});

/**
 * will say if the user wrote the correct password and name
 * @returns if the message issnt loaded
 */
function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (!(requestOne.status == 200)) {
        statusText.innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Falsch<div>";
    } else {
        statusText.innerHTML = "<div style='animation-name: not-error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Richtig<div>";
    }
}
