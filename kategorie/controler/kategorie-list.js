var kategorieList;

var buttonDeleteOut = [];
var buttonEditOut = [];

function loadAllCategories() {
    var table = document.createElement("table");
    table.id = "kategorie-list";
    table.innerHTML = "<tr><th>Kategorien ID</th><th>Active</th><th>Name</th><th>yes</th></tr>";
    document.querySelector("#table-spot").appendChild(table);

    kategorieList = document.querySelector("#kategorie-list");

    requestOne = new XMLHttpRequest();
    requestOne.open("Get", "../../API/v1/Categorys");
    requestOne.onreadystatechange = onRequstUpdate;
    requestOne.send();
}

loadAllCategories();

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

        var category_id = document.createElement("td");
        var active = document.createElement("td");
        var name = document.createElement("td");
        var buttons = document.createElement("td");

        var buttonDelete = document.createElement("button");
        buttonDelete.innerText = "LÖSCHEN";
        buttonDelete.id = "buttonDelete";
        buttonDelete.className = data.category_id;

        var buttonEdit = document.createElement("button");
        buttonEdit.innerText = "EDITIEREN";
        buttonEdit.id = "buttonEdit";
        buttonEdit.className = data.category_id;

        buttons.appendChild(buttonDelete);
        buttons.appendChild(buttonEdit);

        category_id.innerText = data.category_id;
        active.innerText = data.active;
        name.innerText = data.name;

        dataSet.appendChild(category_id);
        dataSet.appendChild(active);
        dataSet.appendChild(name);
        dataSet.appendChild(buttons);

        buttonDeleteOut.push(buttonDelete);
        buttonEditOut.push(buttonEdit);

        kategorieList.appendChild(dataSet);
    });

    addEventListenerToButtons();
}

function addEventListenerToButtons() {
    for (i = 0; i < buttonDeleteOut.length; i++) {
        buttonDeleteOut[i].addEventListener("click", function (event) {
            var categoryId = this.className;
            if (confirm("Sind Sie sicher das sie dieses Element " + categoryId + " löschen wollen") == true) {
                requestOne = new XMLHttpRequest();
                requestOne.open("DELETE", "../../API/v1/Category/" + categoryId);
                requestOne.onreadystatechange = reloadAllCategories;
                requestOne.send();
            }
        });
    }
    
    for (i = 0; i < buttonEditOut.length; i++) {
        buttonEditOut[i].addEventListener("click", function (event) {
            var categoryId = this.className;
            window.location = "kategorie-edit.html#" + categoryId;
        });
    }
}

function reloadAllCategories() {
    document.querySelector("#kategorie-list").remove();
    loadAllCategories();
}

function loginRedirect() {  
    window.location = "../../login/login.html";
    document.querySelector("#login-problem").innerHTML = "<div style='animation-name: error-animation;animation-duration: 3s;animation-iteration-count: infinite;'>Melden sie sich an<div>";
}
