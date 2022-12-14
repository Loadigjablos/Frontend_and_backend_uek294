var kategorieList;

var buttonDeleteOut = []; // all the buttons to delete seretain datasets
var buttonEditOut = []; // all the buttons that edit sertain datasets

/**
 * when called will request data from the API, that will call the function onRequstUpdate.
 */
function loadAllProducts() {
    buttonDeleteOut = [];
    buttonEditOut = [];
    var table = document.createElement("table");
    table.id = "product-list";
    table.innerHTML = "<tr><th>product ID</th><th>sku</th><th>active</th><th>id_category</th><th>productname</th><th>image</th><th>description</th><th>price</th><th>stock</th><th>Knöpfe</th><th>ansehen</th></tr>";
    document.querySelector("#table-spot").appendChild(table);

    kategorieList = table;

    requestOne = new XMLHttpRequest();
    requestOne.open("GET", "../../API/v1/Products"); // gets all the products
    requestOne.onreadystatechange = onRequstUpdate;
    requestOne.send();
}

loadAllProducts();

/**
 * will generate the table with datasets
 * @returns if the message issnt loaded
 */
function onRequstUpdate() {
    if (requestOne.readyState < 4) {
        return;
    }
    if (requestOne.status == 401) {
        loginRedirect();
    }

    var kategorieJson = JSON.parse(requestOne.responseText);
    kategorieJson.forEach(data => {
        var dataSet = document.createElement("tr");

        var product_id = document.createElement("td");
        var sku = document.createElement("td");
        var active = document.createElement("td");
        var id_category = document.createElement("td");
        var productname = document.createElement("td");
        var image = document.createElement("td");
        var description = document.createElement("td");
        var price = document.createElement("td");
        var stock = document.createElement("td");
        var buttons = document.createElement("td");
        var viewObject = document.createElement("td");

        var buttonDelete = document.createElement("button");
        buttonDelete.innerText = "LÖSCHEN";
        buttonDelete.id = "buttonDelete";
        buttonDelete.className = data.sku;

        var buttonEdit = document.createElement("button");
        buttonEdit.innerText = "EDITIEREN";
        buttonEdit.id = "buttonEdit";
        buttonEdit.className = data.sku;

        buttons.appendChild(buttonDelete);
        buttons.appendChild(buttonEdit);

        viewObject.innerHTML = "<a href='product-list-one.html#" + data.sku + "'>ansehen</a>";

        product_id.innerText = data.product_id;
        sku.innerText = data.sku;
        active.innerText = data.active;
        productname.innerText = data.name;
        image.innerText = data.image;
        description.innerText = data.description;
        price.innerText = data.price;
        stock.innerText = data.stock;
        id_category.innerText = data.id_category;

        dataSet.appendChild(product_id);
        dataSet.appendChild(sku);
        dataSet.appendChild(active);
        dataSet.appendChild(id_category);
        dataSet.appendChild(productname);
        dataSet.appendChild(image);
        dataSet.appendChild(description);
        dataSet.appendChild(price);
        dataSet.appendChild(stock);
        dataSet.appendChild(buttons);
        dataSet.appendChild(viewObject);

        buttonDeleteOut.push(buttonDelete);
        buttonEditOut.push(buttonEdit);

        kategorieList.appendChild(dataSet);
    });

    addEventListenerToButtons();
}

/**
 * after all buttons are created, this will add listeners to them
 */
function addEventListenerToButtons() {
    /* 
     * the delete button if confirmed, will request mith the delete method the id of the categorie
     */
    for (i = 0; i < buttonDeleteOut.length; i++) {
        buttonDeleteOut[i].addEventListener("click", function (event) {
            var sku = this.className;
            if (confirm("Sind Sie sicher das sie dieses Element " + sku + " löschen wollen") == true) {
                requestOne = new XMLHttpRequest();
                requestOne.open("DELETE", "../../API/v1/Product/" + sku);
                requestOne.onreadystatechange = afterDeleteReloadAllProducts;
                requestOne.send();
            }
        });
    }
    
    /* 
     * the edit buton redirects to the edit page with the hashtag of the class
     */
    for (i = 0; i < buttonEditOut.length; i++) {
        buttonEditOut[i].addEventListener("click", function (event) {
            var sku = this.className;
            window.location = "Product-edit.html#" + sku;
        });
    }
}

/**
 * when the product got deleted, the list can
 */
function afterDeleteReloadAllProducts() {
    if (requestOne.readyState < 4) {
        return;
    }
    reloadAllProducts();
}

/**
 * delets the table for it to be realoded
 */
function reloadAllProducts() {
    document.querySelector("#product-list").remove();
    loadAllProducts();
}

/**
 * redirects the user to the login page
 */
function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}
