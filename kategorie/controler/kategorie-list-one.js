var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");
var categoryId = document.querySelector("#id");

var inputCategoryId = document.querySelector("#categori-id");

var requestOne;
function categorieChanged() {
    requestOne = new XMLHttpRequest();
    requestOne.open("Get", "../../API/v1/Category/" + location.hash.substring(1));
    requestOne.onreadystatechange = onRequstUpdate;
    requestOne.send();
}

categorieChanged();

/**
 * will add values to the document
 * @returns if the message issnt loaded
 */
function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }
    if (requestOne.status == 200) {
        var kategorieJson = JSON.parse(requestOne.responseText);
        categoryName.innerText = kategorieJson.name;
        categoryActive.innerText = kategorieJson.active;
        categoryId.innerText = kategorieJson.category_id;
        if (kategorieJson.name == undefined || kategorieJson.name == undefined || kategorieJson.name == undefined) {
            backRedirect();
        }
    }
}

inputCategoryId.addEventListener("change", function (event) {
    window.location = "kategorie-list-one.html#" + inputCategoryId.value;
    categorieChanged();
});

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}

/**
 * redirects the user to the list page
 */
function backRedirect() {
    window.location = "/kategorie-list.html";
}

