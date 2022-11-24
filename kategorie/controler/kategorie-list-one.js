var categoryName = document.querySelector("#name");
var categoryActive = document.querySelector("#active");
var categoryId = document.querySelector("#id");

var inputCategoryId = document.querySelector("#categori-id");

var buttonDelete = document.querySelector("#buttonDelete");
var buttonEdit = document.querySelector("#buttonEdit");

var problem = document.querySelector("#problem");

var requestOne;
/**
 * opens the category from the hashtag
 */
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
    } else {
        categoryName.innerText = "";
        categoryActive.innerText = "";
        categoryId.innerText = "";
        problem.innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Produkt wurde nicht gefunden<div>";
    }
}

/**
 * changes the hashtag and this happens: categorieChanged
 */
inputCategoryId.addEventListener("change", function (event) {
    window.location = "kategorie-list-one.html#" + inputCategoryId.value;
    categorieChanged();
});

/**
 * if clicked, will delete the categorie
 */
buttonDelete.addEventListener("click", function (event) {
    var categoryIdValue = location.hash.substring(1);
    if (confirm("Sind Sie sicher das sie dieses Element " + categoryIdValue + " löschen wollen") == true) {
        requestOne = new XMLHttpRequest();
        requestOne.open("DELETE", "../../API/v1/Category/" + categoryIdValue);
        requestOne.send();
    }
});

/**
 * if clicked, will redirect to the edit page
 */
buttonEdit.addEventListener("click", function (event) {
    window.location = "kategorie-edit.html#" + location.hash.substring(1);
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

