var skuSearch = document.querySelector("#sku-search");

var sku = document.querySelector("#sku");
var active = document.querySelector("#active");
var idCategory = document.querySelector("#category-dropdown");
var productName = document.querySelector("#name");
var image = document.querySelector("#image");
var description = document.querySelector("#description");
var price = document.querySelector("#price");
var stock = document.querySelector("#stock");

var problem = document.querySelector("#problem");

var requestOne;
function productChanged() {
    requestOne = new XMLHttpRequest();
    requestOne.open("Get", "../../API/v1/Product/" + location.hash.substring(1));
    requestOne.onreadystatechange = onRequstUpdate;
    requestOne.send();
}

productChanged();

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
        var productJson = JSON.parse(requestOne.responseText);
        sku.innerText
        active.innerText = productJson.active;
        idCategory.innerText = productJson.id_category;
        productName.innerText = productJson.name;
        image.innerText = productJson.image;
        description.innerText = productJson.description;
        price.innerText = productJson.price;
        stock.innerText = productJson.stock;

        problem.innerHTML = "";
    } else {
        sku.innerText = "";
        active.innerText = "";
        idCategory.innerText = "";
        productName.innerText = "";
        image.innerText = "";
        description.innerText = "";
        price.innerText = "";
        stock.innerText = "";
        problem.innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Produkt wurde nicht gefunden<div>";
    }
}

skuSearch.addEventListener("change", function (event) {
    window.location = "product-list-one.html#" + skuSearch.value;
    productChanged();
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
