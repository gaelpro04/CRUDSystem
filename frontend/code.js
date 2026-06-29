const API_BASE =
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : "https://crudsystem-backend.onrender.com";

let editingID = -1;
//here is goint to be saved the items
 let tools = [];


let inputTool = document.getElementById("inputTool");
let select = document.getElementById("select0");
let inputAmount = document.getElementById("inputAmount");

init();

// let rawData = localStorage.getItem("tools");
// rawData = rawData ? JSON.parse(rawData) : [];
// for (let i = 0; i < rawData.length; ++i) {
//     tools.push(new Tool(getLastID() + 1, rawData[i]._name, rawData[i]._category, rawData[i]._amount));
// }


let tbody = document.querySelector("#tbody0");
tbody.addEventListener("click", handletbody);

 let buttonAdd = document.getElementById("buttonAdd");
 buttonAdd.addEventListener("click", handleAddItem);

 let buttonHide = document.querySelector(".buttonHide");
 buttonHide.addEventListener("click", handleHideItem);

 let buttonCreate = document.querySelector(".buttonCreate");
 buttonCreate.addEventListener("click", handleCreateItem);

let buttonCancel = document.createElement("button");
buttonCancel.className = "buttonCancel";
buttonCancel.textContent = "Cancel";
buttonCancel.addEventListener("click", handleCancel);

let buttonConfirm = document.createElement("button");
buttonConfirm.className = "buttonConfirm";
buttonConfirm.textContent = "Confirm";
buttonConfirm.addEventListener("click", (event) => handleConfirm(event, editingID));

let input = document.getElementById("inputSearch");
input.addEventListener("input", handleInputSearch);


//confirmation section of delete
let bodyy = document.getElementById("bodyy");
let divWarning = document.createElement("div");
divWarning.className = "divW";
bodyy.append(divWarning);

let labelWarning = document.createElement("label");
labelWarning.textContent = "Are you sure?";
labelWarning.className = "labelW";
divWarning.append(labelWarning);


let divContainer = document.createElement("div");
divContainer.className = "divContainer";


let buttonWYes = document.createElement("button");
buttonWYes.textContent = "Yes";
buttonWYes.addEventListener("click", (event) => handleYes(event, editingID));

let buttonWNo = document.createElement("button");
buttonWNo.textContent = "No";
buttonWNo.addEventListener("click", handleNo);

divContainer.append(buttonWYes);
divContainer.append(buttonWNo);
divWarning.append(divContainer);

let divNot = document.querySelector(".divNot");


async function init() {
    tools = await getTools();
    updateTable(tools);
}

async function getTools() {
    const res = await fetch(`${API_BASE}/tools`);
    tools = await res.json();
    return tools;
}

function notification(typeNoti, toolName) {

    let labelNot = document.querySelector(".labelNot");
    let stringColor;
    if (typeNoti === "add") {
        labelNot.textContent = "Tool added: " + toolName;
        stringColor = "openAdd";
    } else if (typeNoti === "delete") {
        labelNot.textContent = "Tool eliminated: " + toolName;
        stringColor = "openDel";
    } else {
        labelNot.textContent = "Tool edited: " + toolName;
        stringColor = "openEdit";
    }
    divNot.classList.add(stringColor);

    setTimeout(() => {
        divNot.classList.remove(stringColor);
    }, 2500);
}

function handleInputSearch() {
    let textValue = input.value.trim().toLowerCase();
    let toolsTemp = tools.filter(t => t._name.toLowerCase().startsWith(textValue));
    updateTable(toolsTemp);
}

async function handletbody(event) {
    const button = event.target.closest("button");
    if (!button) return;

    let id = event.target.closest("tr").dataset.id;
    id = Number(id);

    let tool = await getTool(id);
    editingID = id;
    
    //En vez de usar className == "btnEditar" ya que me dara un string de
    //todas las clases con btnEditar
    if (button.classList.contains("btnEditar")) {
        let form = document.querySelector(".form-right");

        form.classList.add("open");
        form.classList.remove("close");

        inputTool.value = tool._name;
        let valueTemp;
        
        for (let option of select.options) {
            if (option.text == tool._category) {
                valueTemp = option.value;
                break;
            }
        }
        select.value = valueTemp;
        inputAmount.value = tool._amount;
        
        buttonHide.classList.add("hide");
        buttonCreate.classList.add("hide");

        let formBottom = document.querySelector(".form-right-bottom");
        let label = document.querySelector(".warningLab");
        label.remove();

        
        buttonCancel.classList.remove("hide");
        buttonConfirm.classList.remove("hide");
        formBottom.append(buttonCancel);
        formBottom.append(buttonConfirm);
        formBottom.append(label);

    } else if (button.classList.contains("btnEliminar")) {

        divWarning.classList.add("open");

    }
}

async function handleYes(event, id) {
    let tool = await getTool(id);
    await deleteTool(id);
    for (let tool of tools) {
    }
    divWarning.classList.remove("open");
    notification("delete", tool._name);
} 


async function deleteTool(id) {
    await fetch(`${API_BASE}/tools/${id}`, {method: "DELETE"});
    tools = await getTools();
    updateTable(tools);
}

function handleNo() {
    divWarning.classList.remove("open");
}

function handleCancel(event) {
    buttonHide.classList.remove("hide");
    buttonCreate.classList.remove("hide");
    buttonCancel.classList.add("hide");
    buttonConfirm.classList.add("hide");

    inputTool.value = "";
    select.value = "sel";
    inputAmount.value = "";
}

async function handleConfirm(event, id) {
    
    let allGood = true;
    let tool = await getTool(id);

    if ((inputTool.value.length < 4 || inputTool.value === tool._name) && (select.value == "sel" || tool._category === select.selectedOptions[0].text) && (inputAmount.value < 0 || Number(tool._amount) === Number(inputAmount.value))) {
        allGood = false;
    } 

    if (!allGood) {
        let label = document.querySelector(".warningLab");
        label.textContent = "Still being the same data";
        label.classList.toggle("wrong");
    } else {

        tool._name = inputTool.value;
        tool._category = select.selectedOptions[0].text;
        tool.amount = inputAmount.value;
        

        const newTool = {
            _name: inputTool.value,
            _category: select.selectedOptions[0].text,
            _amount: inputAmount.value
        };
        
        notification("edited", newTool._name);
        await modifyTool(newTool, id);
        tools = await getTools();
        updateTable(tools);

    }
}

async function modifyTool(tool, id) {
    
    await fetch(`${API_BASE}/tools/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tool)
    });

    tools = await getTools();
    updateTable(tools);
}

async function getTool(id) {

    const res = await fetch(`${API_BASE}/tools/${id}`);
    let tool = await res.json();
    return tool;
}

function updateTable(toolsTemp) {
    
    const amountDATA = 6;
    tbody.innerHTML = "";
    for (const tool of toolsTemp) {
        let tr = document.createElement("tr");

        let td = [];
        for (let i = 0; i < amountDATA; ++i) {
            td[i] = document.createElement("td");
        }  

        tr.dataset.id = tool._id;
        td[0].textContent = tool._id;
        td[1].textContent = tool._name;
        td[2].textContent = tool._category;
        td[3].textContent = tool._amount;
        td[4].textContent = tool._state;
        td[5].innerHTML = `<div class="actions">
                                <button class = "btnEditar"> Edit</button>
                                <button class = "btnEliminar"> Delete </button>
                            </div>`;
        
        for (let i = 0; i < amountDATA; ++i) {
            td[i].className = "data";
            tr.append(td[i]);
        }

        tbody.append(tr);
    }
}


function handleAddItem() {
    let form = document.querySelector(".form-right");

    form.classList.add("open");
    form.classList.remove("close");

 }

 function handleHideItem() {
    let form = document.querySelector(".form-right");
    form.classList.add("close");
    form.classList.remove("open");
    let label = document.querySelector(".warningLab");
    label.classList.remove("wrong");

    inputTool.value = "";
    select.value = "sel";
    inputAmount.value = "";
 }

async function handleCreateItem() {

    let allGood = true;

    if (inputTool.value.length < 4) {
        allGood = false;
    } 

    if (select.value == "sel") {
        allGood = false;
    }

    if (inputAmount.value < 0) {
        allGood = false;
    }

    inputTool.value = inputTool.value.trim();

    if (!allGood) {
        let label = document.querySelector(".warningLab");
        label.classList.add("wrong");
    } else {
        inputAmount.value = Number(inputAmount.value);

        notification("add", inputTool.value);
        addToTools(inputTool.value, select.selectedOptions[0].text, inputAmount.value);
    }
 }

 //DATA
 //Functions that allows add tools to the tools
 async function addToTools(input, select, amount) {
    const newTool = {
        _name: input,
        _category: select,
        _amount: amount
    };

    await fetch(`${API_BASE}/tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTool)
    });

    tools = await getTools();
    updateTable(tools);
 }

 //Function that allows to see the last ID on tools
 function getLastID() {
    
    let id = -1;
    let tool = tools.pop();

    if (tool != null) {
        id = tool._id;
        tools.push(tool);
    }
    return Number(id);
 }