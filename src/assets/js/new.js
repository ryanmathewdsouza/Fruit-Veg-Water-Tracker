let foodCount;
let waterCount;

let rows = document.getElementsByClassName("itemRow");

let clearButton = document.getElementById("clear-button");
clearButton.addEventListener('click', clearTable);

function clearTable() {
    // delete anything already in the table
    let table = document.getElementById("consumed-table");
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = "";
    localStorage.removeItem("food/drink");
    createTable(read());
}

// add event listener to add-water button
let addWaterButton = document.getElementById("add-water");
addWaterButton.addEventListener('click', addWater);

// add event listener to add-fruit button
let addFruitButton = document.getElementById("add-fruit");
addFruitButton.addEventListener('click', addFood);

createTable(read());

function read() {
    let json = localStorage.getItem("food/drink");
    console.log("check if running");
    console.log(json);
    if (json === null) {
        return [];
    } else {
        return JSON.parse(json);
    }
}

// function store(dataToBeStored) {
function store(dataToBeStored) {
    let stringify = JSON.stringify(dataToBeStored);
    localStorage.setItem("food/drink", stringify);
}

function createTable(itemsToSave) {
    // delete anything already in the table
    let table = document.getElementById("consumed-table");
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = "";

    // loop through every item, create a row for each item and hookup delete button
    itemsToSave.forEach((item, index) => {

        // add row to table with class "fruitRow" and insert cells
        let row = tBody.insertRow(-1);
        // row.classList.add("fruitRow");
        row.classList.add("itemRow");
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        if (item.type === "water") {
            // assign values to empty cells
            cell1.innerHTML = "N/A";
            // fill cell with name of water container
            cell2.innerHTML = item.water;
            // fill cell with volume of container
            cell3.innerHTML = item.volume.toString() + "L";
        } else {
            // fill cell with name of food
            cell1.innerHTML = item.name;
            // fill cell with N/A
            cell2.innerHTML = "N/A";
            // fill cell with N/A
            cell3.innerHTML = "N/A";
        }

        // fill cell with delete button
        cell4.innerHTML = "<button>Delete</button>";

        let button = cell4.querySelector("button");
        button.addEventListener('click', deleteRow);

        function deleteRow(event) {
            itemsToSave.splice(index, 1);
            createTable(itemsToSave);
            greenOrRed();
        }
    });
    // call store() to save to local storage
    store(itemsToSave);

    updateTotals(itemsToSave);
    greenOrRed();
}

// calculate total water just from "waterRow" cells and fill total-water cell with value
function updateTotals(itemsToSave) {
    let foodCount = 0;
    let waterCount = 0;
    itemsToSave.forEach(item => {
        if (item.type == "water") {
            waterCount += item.volume;
        } else {
            foodCount ++;
        }
    })
    let totalWater = document.getElementById("total-water");
    totalWater.innerHTML = "<h2>" + waterCount.toFixed(2) + "L</h2>";
    if (totalWater.innerHTML === "<h2>0.00L</h2>") {
        totalWater.innerHTML = "<h2>0L</h2>";
    }
    let totalFood = document.getElementById("total-fruit");
    totalFood.innerHTML = "<h2>" + foodCount + "</h2>";

    let fruitValue = document.getElementById("total-fruit");
    if (foodCount < 5) {
        fruitValue.style.background = "red";
    } else {
        fruitValue.style.background = "green";
    }
    let waterValue = document.getElementById("total-water");
    if (waterCount < 1.99) {
        waterValue.style.background = "red";
    } else {
        waterValue.style.background = "green";
    }
}

function addWater(event) {
    // grab values of container, and add to waterArray
    let button = event.target;
    let modalContent = button.parentElement.parentElement;
    let modalBody = modalContent.getElementsByClassName("modal-body")[0];
    let waterModalForm = modalBody.getElementsByClassName("water-modal-form")[0];
    let waterInput = waterModalForm.getElementsByClassName("water-input")[0];
    let waterArray = waterInput.value.split(",");

    let waterObject = {
        type: "water",
        water: waterArray[0],
        volume: parseFloat(waterArray[1]),
    };

    let currentItems = read();
    currentItems.push(waterObject);
    createTable(currentItems);
}

function addFood(event) {
    // grab name of fruit, and add to value of fruitInput
    let button = event.target;
    let modalContent = button.parentElement.parentElement;
    let modalBody = modalContent.getElementsByClassName("modal-body")[0];
    let fruitModalForm = modalBody.getElementsByClassName("fruit-modal-form")[0];
    let fruitInput = fruitModalForm.getElementsByClassName("fruit-input")[0];
    let fruitValue = fruitInput.value;

    let foodObject = {
        type: "food",
        name: fruitValue,
    };

    let currentItems = read();
    currentItems.push(foodObject);
    createTable(currentItems);
}