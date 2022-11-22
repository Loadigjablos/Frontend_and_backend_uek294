var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");

var activeValue;

var requestOne;

requestOne = new XMLHttpRequest();
requestOne.open("GET", "../../API/v1/Category/" + location.hash.substring(1));
requestOne.onreadystatechange = onRequstUpdate;
requestOne.send();

document.querySelector("#edit").addEventListener("click", function (event) {
    var requestTwo = new XMLHttpRequest();
    requestTwo.open("PUT", "../../API/v1/Category/" + location.hash.substring(1));
    if (activeValue == "on") {
        activeValue = false;
    } else {
        activeValue = true;
    }
    var sendJSON = {
        active: activeValue,
        name: categoryName.value
    }
    requestTwo.send(JSON.stringify(sendJSON));
});

function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
    var kategorieJson = JSON.parse(requestOne.responseText);
    categoryName.value = kategorieJson.name;
    categoryActive.value = kategorieJson.active;
}

function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}