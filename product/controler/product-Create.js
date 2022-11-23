var sku = document.querySelector("#sku");
var active = document.querySelector("#active");
var id_category = document.querySelector("#category-dropdown");
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
requestTwo.open("GET", "../../API/v1/Categorys");
requestTwo.onreadystatechange = onRequstGetCategorys;
requestTwo.send();

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
        option.innerText = categoryValue.category_id + ", " + categoryValue.active + ", " + categoryValue.name;
        option.value = categoryValue.category_id;
        id_category.appendChild(option);
    });
}

/**
 * the button create has this function when it is clicked
 */
document.querySelector("#create").addEventListener("click", function (event) {
    requestOne = new XMLHttpRequest();
    requestOne.open("POST", "../../API/v1/Product");
    requestOne.onreadystatechange = onRequstUpdate;

    if (description.value == "") {
        problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Die Beschreibung muss gesetzt werden<div>";
        return;
    }
    var categoryIdValue = id_category.value;
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
    console.log(JSON.stringify(sendJSON));
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
    console.log(requestOne.status);
    console.log(requestOne.responseText);
}

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    problem.innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}