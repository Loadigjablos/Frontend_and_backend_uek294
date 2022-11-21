var username = document.querySelector("#name");
var passwd = document.querySelector("#passwd");
var statusText = document.querySelector("#status");

var requestOne;

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

document.querySelector("#back").addEventListener("click", function (event) {
    window.location = "../index.html";
});

function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 406 || requestOne.status == 400) {
        statusText.innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Falsch<div>";
    } else {
        statusText.innerHTML = "<div style='animation-name: not-error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Richtig<div>";
    }
    console.log(requestOne.status);
}
