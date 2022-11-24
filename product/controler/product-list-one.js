var skuSearch = document.querySelector("#sku-search");

var sku = document.querySelector("#sku");
var active = document.querySelector("#active");
var idCategory = document.querySelector("#category-dropdown");
var productName = document.querySelector("#name");
var image = document.querySelector("#image");
var description = document.querySelector("#description");
var price = document.querySelector("#price");
var stock = document.querySelector("#stock");

var buttonDelete = document.querySelector("#buttonDelete");
var buttonEdit = document.querySelector("#buttonEdit");

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
        sku.innerText = productJson.sku;
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

/**
 * changes the hashtag and this happens: categorieChanged
 */
skuSearch.addEventListener("change", function (event) {
    window.location = "product-edit.html#" + location.hash.substring(1);
    productChanged();
});

/**
 * if clicked, will delete the product
 */
buttonDelete.addEventListener("click", function (event) {
    var skuValue = location.hash.substring(1);
    if (confirm("Sind Sie sicher das sie dieses Element " + skuValue + " löschen wollen") == true) {
        requestOne = new XMLHttpRequest();
        requestOne.open("DELETE", "../../API/v1/Product/" + skuValue);
        requestOne.send();
    }
});

/**
 * if clicked, will redirect to the edit page
 */
buttonEdit.addEventListener("click", function (event) {
    window.location = "product-edit.html#" + location.hash.substring(1);
});

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}
