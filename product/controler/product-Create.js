var sku = document.querySelector("#sku");
var active = document.querySelector("#active");
var idCategory = document.querySelector("#category-dropdown");
var productName = document.querySelector("#name");
var image = document.querySelector("#image");
var description = document.querySelector("#description");
var price = document.querySelector("#price");
var stock = document.querySelector("#stock");

var problem = document.querySelector("#problem");

problem.innerHTML = "";

var allCategorys = [];

var requestOne;

var requestTwo;
requestTwo = new XMLHttpRequest();
requestTwo.open("GET", "../../API/v1/Categorys"); // gets all the categorys
requestTwo.onreadystatechange = onRequstGetCategorys;
requestTwo.send();

/**
 * adds Category options to a select tag.
 * @returns if the message issnt loaded
 */
function onRequstGetCategorys() {
    if (requestTwo.readyState < 4) {
        return;
    }
    if (requestTwo.status == 401) {
        loginRedirect();
    }

    var categorieJson = JSON.parse(requestTwo.responseText);

    categorieJson.forEach(categoryValue => {
        var option = document.createElement("option");
        option.innerText = "ID: " + categoryValue.category_id + ", Active:" + categoryValue.active + ", Name:" + categoryValue.name;
        option.value = categoryValue.category_id;
        idCategory.appendChild(option);
    });
}

/**
 * the button create has this function when it is clicked
 */
document.querySelector("#create").addEventListener("click", function (event) {
    problem.innerHTML = "";
    requestOne = new XMLHttpRequest();
    requestOne.open("POST", "../../API/v1/Product");
    requestOne.onreadystatechange = onRequstUpdate;

    // description needs a Value. cant be Null
    if (description.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Die Beschreibung muss gesetzt werden<div>";
        return;
    }
    // price needs a Value. cant be Null
    if (price.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Den preis muss gesetzt werden<div>";
        return;
    }
    // stock needs a Value. cant be Null
    if (description.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Der stock muss gesetzt werden<div>";
        return;
    }
    // name needs a Value. cant be Null
    if (productName.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Der name muss gesetzt werden<div>";
        return;
    }
    // image needs a Value. cant be Null
    if (image.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Das image muss gesetzt werden<div>";
        return;
    }
    // sku needs a Value. cant be Null
    if (sku.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Das sku muss gesetzt werden<div>";
        return;
    }


    var categoryIdValue = idCategory.value;
    if (categoryIdValue == "") {
        categoryIdValue = null;
    }
    
    var sendJSON = {
        sku: sku.value,
        active: active.checked,
        id_category: categoryIdValue,
        name: productName.value,
        image: image.value,
        description: description.value,
        price: price.value,
        stock: stock.value
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
    if (!(requestOne.status == 201)) {
        var error = JSON.parse(requestOne.responseText);
        if (!(error.error == "")) {
            problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>" + error.error + "<div>";
        }
    } else {
        alert("Erfolgreich");
    }
}

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}