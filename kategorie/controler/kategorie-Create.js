var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");

var activeValue = categoryActive.value;

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
    console.log(sendJSON);
    console.log(categoryActive.value);
    console.log(activeValue);
    requestOne.send(JSON.stringify(sendJSON));
    onRequstUpdate();
});

function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
}

function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}