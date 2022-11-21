var kategorieList = document.querySelector("#kategorie-list");

var buttonDeleteOut = [];
var buttonEditOut = [];



requestOne = new XMLHttpRequest();
requestOne.open("Get", "../../API/v1/Categorys");
requestOne.onreadystatechange = onRequstUpdate;
requestOne.send();
onRequstUpdate();

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
            requestOne = new XMLHttpRequest();
            requestOne.open("DELETE", "../../API/v1/Category/" + categoryId);
            requestOne.onreadystatechange = onRequstUpdate;
            requestOne.send();
        });
    }
    
    for (i = 0; i < buttonEditOut.length; i++) {
        buttonEditOut[i].addEventListener("click", function (event) {
            var categoryId = this.className;
            window.location = "kategorie-edit.html#" + categoryId;
        });
    }
}

function loginRedirect() {  
    window.location = "../../login/login.html";
}  
