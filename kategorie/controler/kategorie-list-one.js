var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");
var categoryId = document.querySelector("#id");

var requestOne;
requestOne = new XMLHttpRequest();
requestOne.open("Get", "../../API/v1/Category/" + location.hash.substring(1));
requestOne.onreadystatechange = onRequstUpdate;
requestOne.send();

function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
	var kategorieJson = JSON.parse(requestOne.responseText);
    categoryName.innerText = kategorieJson.name;
    categoryActive.innerText = kategorieJson.active;
    categoryId.innerText = kategorieJson.category_id;
    if (kategorieJson.name == undefined || kategorieJson.name == undefined || kategorieJson.name == undefined) {
        errorRedirect();
    }
}

function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}

function errorRedirect() {
    window.location = "../../index.html";
}
