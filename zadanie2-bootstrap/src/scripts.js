/* jshint esversion: 6 */
/* jshint browser: true */
/* jshint jquery: true */


const binId = "5f88371065b18913fc5f5e27";
const secretKey = "$2b$10$l5RmfbWA5ai7j9g01fwlM.tsfI4179haJqdTve3LYz6qWS8uBVdlq";
let jsonBinUrl = "https://api.jsonbin.io/b/" + binId;
let todoList = [];


function initialize() {
    fetchLocal();
}

function errorModal(message) {
    console.log({message: message});
    $("#errorModal").modal("show");
    let modalBody = $('#errorModalBody');
    modalBody.children().remove();
    let p = document.createElement('p');
    p.innerText = message;
    modalBody.append(p);
}

function fetchInternetSaveLocalAndSaveLocal() {
    $.ajax({
        url: jsonBinUrl+"/latest",
        headers: {
            "secret-key": secretKey
        },
        error: (err) => {
            console.log({
                error: err
            });
            errorModal("Pobranie danych z serwera się nie powiodło");
        },
        success: (data) => {
            //errorModal("Pobranie danych z serwera się powiodło");
            todoList = data;
            saveLocal();
            updateList();
        }
    });
}

function saveInternet() {
    $.ajax({
        url: jsonBinUrl,
        type: 'PUT',
        headers: {
            "secret-key":secretKey
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        error: (err) => {
            console.log({
                error: err
            });
            errorModal("Zapis danych na serwer się nie powiódł");
        },
        success: (data) => {
            //errorModal("Zapis danych na serwer się powiódł");
        }
    });
}

function fetchLocal() {
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else {
        todoList.push({
            title: "Przykładowe spotkanie 1",
            description: "Opis przykładowego spotkania",
            place: "Gdzieś w świecie",
            dueDate: new Date(2019, 10, 16)
        }, {
            title: "Przykładowe spotkanie 2",
            description: "Opis przykładowego spotkania",
            place: "B9/F11",
            dueDate: new Date(2019, 10, 17)
        });
        saveLocal();
    }
    updateList();
}

function saveLocal() {
    window.localStorage.setItem("todos", JSON.stringify(todoList));
}

function updateList() {
    let serach = $('#serach');

    let needFilter = (serach.value != "");

    let todoListView = $("#todoList-view");
    todoListView.children().remove();

    for (let todoIndex in todoList) {
        if(needFilter) {
            let filter = serach.val().toUpperCase();
            console.log({"filter":filter});
            let t = todoList[todoIndex];
            let title = t.title.toUpperCase();
            let description = t.description.toUpperCase();
            let place = t.place.toUpperCase();
            let date = new Date(todoList[todoIndex].dueDate);
            let dueDate = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
            let titleMatch = title.includes(filter);
            let descriptionMatch = description.includes(filter);
            let placeMatch = place.includes(filter);
            let dueDateMatch = dueDate.includes(filter);
            if(titleMatch || descriptionMatch || placeMatch || dueDateMatch) {
                console.log({"todo":t,"match":{"titleMatch":titleMatch,"descriptionMatch":descriptionMatch,"placeMatch":placeMatch,"dueDateMatch":dueDate}});
            } else {
                continue;
            }
        }
        let tr = document.createElement("tr");

        let tdTitle = document.createElement("td");
        tdTitle.innerText = todoList[todoIndex].title;
        tdTitle.className = "todo-title";
        tr.appendChild(tdTitle);
        
        let tdDescription = document.createElement("td");
        tdDescription.innerText = todoList[todoIndex].description;
        tdDescription.className = "todo-description";
        tr.appendChild(tdDescription);
        
        let tdPlace = document.createElement("td");
        tdPlace.innerText = todoList[todoIndex].place;
        tdPlace.className = "todo-place";
        tr.appendChild(tdPlace);

        let tdDueDate = document.createElement("td");
        let date = new Date(todoList[todoIndex].dueDate);
        tdDueDate.innerText = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
        tdDueDate.className = "todo-dueDate";
        tr.appendChild(tdDueDate);

        let tdDeleteBtn = document.createElement("td");
        deleteBtn = document.createElement("button");
        deleteBtn.className = "todo-deleteBtn btn btn-danger";
        deleteBtn.type = "button";
        deleteBtnIcon = document.createElement('span');
        deleteBtnIcon.className = "oi oi-trash";
        deleteBtn.appendChild(deleteBtnIcon);
        tdDeleteBtn.appendChild(deleteBtn);
        //jshint -W083
        tdDeleteBtn.addEventListener("click", () => {
            remove(todoIndex);
        });
        //jshint +W083
        tr.appendChild(tdDeleteBtn);

        todoListView.append(tr);
    }

}

function add() {
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");

    let newTitle = inputTitle.val();
    let newDescription = inputDescription.val();
    let newPlace = inputPlace.val();
    let newDate = new Date(inputDate.val());

    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
    todoList.push(newTodo);
    saveLocal();
    updateList();
}

function remove(todoIndex) {
    todoList.splice(todoIndex, 1);
    saveLocal();
    updateList();
}

$(document).ready(() => {
    console.log("document ready");
    //setInterval(updateList, 1000);
    $("#addBtn").click(add);
    $("#serachBtn").click(updateList);
    $("#serach").change(updateList);
    $("#serach").keydown(updateList);
    $("#fetchInternetBtn").click(fetchInternetSaveLocalAndSaveLocal);
    initialize();
    $("#saveInternetBtn").click(saveInternet);
});