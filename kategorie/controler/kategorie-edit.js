var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");

var requestOne;
var requestTwo;

requestOne = new XMLHttpRequest();
requestOne.open("GET", "../../API/v1/Category/" + location.hash.substring(1));
requestOne.onreadystatechange = onRequstUpdate;
requestOne.send();

/**
 * when the edit button is pressed, it will send data from the input fileds in a JSON format
 */
document.querySelector("#edit").addEventListener("click", function (event) {
    requestTwo = new XMLHttpRequest();
    requestTwo.open("PUT", "../../API/v1/Category/" + location.hash.substring(1));
    requestTwo.onreadystatechange = onChangeData;
    var sendJSON = {
        active: categoryActive.checked,
        name: categoryName.value
    }
    console.log(sendJSON);
    requestTwo.send(JSON.stringify(sendJSON));
});

/**
 * if data is sent, cheeks for user validation
 * @returns if the message issnt loaded
 */
function onChangeData() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
    backRedirect();
}

/**
 * data will be stored in the input fields
 * @returns if the message issnt loaded
 */
function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
    if (!(requestOne.status == 200)) {
        backToIndexRedirect();
    }
    var kategorieJson = JSON.parse(requestOne.responseText);
    categoryName.value = kategorieJson.name;
    categoryActive.checked = kategorieJson.active;
}

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}

/**
 * redirects the user to the start index page
 */
function backToIndexRedirect() {
    window.location = "../../index.html";
}

/**
 * redirects the user to the list page
 */
 function backRedirect() {
    window.location = "kategorie-list.html";
}
