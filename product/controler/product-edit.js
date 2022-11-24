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
var requestThree;

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
        option.innerText = categoryValue.category_id + ", " + categoryValue.active + ", " + categoryValue.name;
        option.value = categoryValue.category_id;
        idCategory.appendChild(option);
    });
}

/**
 * when the edit button is pressed, it will send data from the input fileds in a JSON format
 */
document.querySelector("#edit").addEventListener("click", function (event) {
    requestTwo = new XMLHttpRequest();
    requestTwo.open("PUT", "../../API/v1/Product/" + location.hash.substring(1));
    requestTwo.onreadystatechange = onChangeData;

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

    var categoryIdValue = idCategory.value;
    if (categoryIdValue == "") {
        categoryIdValue = null;
    }

    var sendJSON = {
        active: active.checked,
        id_category: categoryIdValue,
        name: productName.value,
        image: image.value,
        description: description.value,
        price: price.value,
        stock: stock.value
    }
    console.log(sendJSON);
    requestTwo.send(JSON.stringify(sendJSON));
});

/**
 * if data is sent, cheeks for user validation
 * @returns if the message issnt loaded
 */
function onChangeData() {
    if (requestTwo.readyState < 4) {
        return;
    }
    if (requestTwo.status == 401) {
        loginRedirect();
    }
    backRedirect();
}

requestThree = new XMLHttpRequest();
requestThree.open("GET", "../../API/v1/Product/" + location.hash.substring(1));
requestThree.onreadystatechange = onRequstUpdate;
requestThree.send();

/**
 * data will be stored in the input fields
 * @returns if the message issnt loaded
 */
function onRequstUpdate() {
    if (requestThree.readyState < 4) {
        return;
    }
    if (requestThree.status == 401) {
        loginRedirect();
    }

    var productJson = JSON.parse(requestThree.responseText);
    console.log(productJson);
    active.checked = productJson.active;
    idCategory.value = productJson.id_category;
    productName.value = productJson.name;
    image.value = productJson.image;
    description.innerText = productJson.description;
    price.value = productJson.price;
    stock.value = productJson.stock;
}

/**
 * redirects the user to the login page
 */
function loginRedirect() {
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML += "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}

/**
 * redirects the user to the list page
 */
 function backRedirect() {
    window.location = "product-list.html";
}
