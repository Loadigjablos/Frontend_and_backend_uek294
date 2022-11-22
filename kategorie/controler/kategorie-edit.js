var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");

var activeValue;

var requestOne;

requestOne = new XMLHttpRequest();
requestOne.open("GET", "../../API/v1/Category/" + location.hash);
requestOne.onreadystatechange = onRequstUpdate;
requestOne.send();

document.querySelector("#edit").addEventListener("click", function (event) {
    var requestTwo = new XMLHttpRequest();
    requestTwo.open("PUT", "../../API/v1/Category" + location.hash);
    if (activeValue == "on") {
        activeValue = false;
    } else {
        activeValue = true;
    }
    var sendJSON = {
        active: activeValue,
        name: categoryName.value
    }
    console.log(sendJSON);
    console.log(categoryActive.value);
    console.log(activeValue);
    requestTwo.send(JSON.stringify(sendJSON));
});

function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
    console.log(requestOne.status);
    categoryName.value = requestOne.name;
    console.log(requestOne.name);
    categoryActive.value = requestOne.active;
}

function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}