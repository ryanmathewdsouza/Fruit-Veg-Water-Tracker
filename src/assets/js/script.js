// loadFruit();
let testButton = document.getElementById("test-button");
testButton.addEventListener('click', loadFruit);

// add event listener to add-water button
let addWaterButton = document.getElementById("add-water");
addWaterButton.addEventListener('click', addWater);

function addWater(event) {
    // grab values of container, and add to waterArray
    let button = event.target;
    let modalContent = button.parentElement.parentElement;
    let modalBody = modalContent.getElementsByClassName("modal-body")[0];
    let waterModalForm = modalBody.getElementsByClassName("water-modal-form")[0];
    let waterInput = waterModalForm.getElementsByClassName("water-input")[0];
    let waterArray = waterInput.value.split(",");

    let table = document.getElementById("consumed-table");
    // add row to table, with class of "waterRow" and insert cells
    let row = table.insertRow(-1);
    row.classList.add("waterRow");
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    // assign values to empty cells
    // fill cell with "N/A"
    cell1.innerHTML = "N/A";
    // fill cell with container name
    cell2.innerHTML = waterArray[0];
    // fill cell with volume
    cell3.innerHTML = waterArray[1];
    // fill cell with delete button
    cell4.innerHTML = "<button class=delete>Delete</button>";

    let deleteButtons = document.getElementsByClassName('delete');
    // following lines of code only run inside the addWater(event) function, not outside of it.
    // code below runs the number of times that delete is pressed
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        button.addEventListener('click', deleteRow);
    }
    function deleteRow(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateTotalWater();
    }
    updateTotalWater();
}

// calculate total water just from "waterRow" cells and fill total-water cell with value
function updateTotalWater() {
    let waterRows = document.getElementsByClassName("waterRow");
    let subTotal = Array.from(waterRows).slice(1).reduce((total, row) => {
        return total + parseFloat(row.cells[2].innerHTML.replace('L', ''));
    }, 0);
    let totalWater = document.getElementById("total-water");
    totalWater.innerHTML = "<h2>" + subTotal.toFixed(2) + "L</h2>";
    if (totalWater.innerHTML === "<h2>0.00L</h2>") {
        totalWater.innerHTML = "<h2>0L</h2>";
    }
    greenOrRed();
}

// add event listener to add-fruit button
let addFruitButton = document.getElementById("add-fruit");
addFruitButton.addEventListener('click', addFruit);


function addFruit(event) {
    // grab name of fruit, and add to value of fruitInput
    let button = event.target;
    let modalContent = button.parentElement.parentElement;
    let modalBody = modalContent.getElementsByClassName("modal-body")[0];
    let fruitModalForm = modalBody.getElementsByClassName("fruit-modal-form")[0];
    let fruitInput = fruitModalForm.getElementsByClassName("fruit-input")[0];

    let table = document.getElementById("consumed-table");
    // add row to table with class "fruitRow" and insert cells
    let row = table.insertRow(-1);
    row.classList.add("fruitRow");
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    saveFruit(event);

    // assign values to empty cells
    // fill cell with name of fruit
    cell1.innerHTML = fruitInput.value;
    // alert(fruitNumber);
    // cell1.innerHTML = localStorage.getItem("fruitNo" + fruitNumber);
    // fill cell with "N/A"
    cell2.innerHTML = "N/A";
    // fill cell with "N/A"
    cell3.innerHTML = "N/A";
    // fill cell with delete button
    cell4.innerHTML = "<button class=delete>Delete</button>";


    let deleteButtons = document.getElementsByClassName('delete');
    // following lines of code only run inside the addFruit(event) function, not outside of it.
    // code below runs the number of times that delete is pressed
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        button.addEventListener('click', deleteRow);
    }
    function deleteRow(event) {
        alert("deleteRow() entered");
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateTotalFruit();
    }
    updateTotalFruit();
}

function saveFruit(event) {
    let button = event.target;
    let modalContent = button.parentElement.parentElement;
    let modalBody = modalContent.getElementsByClassName("modal-body")[0];
    let fruitModalForm = modalBody.getElementsByClassName("fruit-modal-form")[0];
    let fruitInput = fruitModalForm.getElementsByClassName("fruit-input")[0];

    // let fruitRows = table.getElementsByClassName("fruitRow");
    // for loop from zero to the number of fruit rows in the consumed table
    // for (let i = 0; i < fruitRows.length; i++) {
    //
    // }
    // save last element in fruitRows to localStorage
    // let lastFruit = fruitRows[fruitNumber];
    localStorage.setItem('fruitNo'+ localStorage.getItem("fruitNumber"), fruitInput.value);
    // for each iteration through fruit rows, save fruit to localstorage under name of ith-fruit
    // alert(localStorage.getItem("fruitNo" + fruitNumber));
    localStorage.setItem("fruitNumber", localStorage.getItem("fruitNumber") + 1);
    // fruitNumber++;
}

// count number of fruitRows and fill total-fruit cell with value
function updateTotalFruit() {
    let table = document.getElementById("consumed-table");
    let fruitRows = table.getElementsByClassName("fruitRow");
    let totalFruit = document.getElementById("total-fruit");
    totalFruit.innerHTML = "<h2>" + fruitRows.length + "</h2>";
    greenOrRed();
}

greenOrRed();

function greenOrRed() {
    let fruitValue = document.getElementById("total-fruit");
    if (fruitValue.innerText < 5) {
        fruitValue.style.background = "red";
    } else {
        fruitValue.style.background = "green";
    }
    let waterValue = document.getElementById("total-water");
    if (waterValue.innerText[0] < 2) {
        waterValue.style.background = "red";
    } else {
        waterValue.style.background = "green";
    }
}





// move code into addFruit()
function loadFruit() {
    // alert("entered loadFruit()");
    for (let i = 0; i < localStorage.getItem("fruitNumber"); i++) {
        // insert grabbed fruit into consumed table
        let loadedFruit = localStorage.getItem("fruitNo" + i);
        if (loadedFruit == null) {
            break;
        }
        alert(loadedFruit);

        let table = document.getElementById("consumed-table");
        // add row to table with class "fruitRow" and insert cells
        let row = table.insertRow(-1);
        row.classList.add("fruitRow");
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        // alert("reached bottom of cell#");

        // assign values to empty cells
        // fill cell with name of fruit
        // cell1.innerHTML = fruitInput.value;
        // alert(localStorage.getItem(localStorage.getItem("fruitNumber")));
        cell1.innerHTML = loadedFruit;
        // alert("reached cell1.innerHTML");
        // fill cell with "N/A"
        cell2.innerHTML = "N/A";
        // fill cell with "N/A"
        cell3.innerHTML = "N/A";
        // fill cell with delete button
        cell4.innerHTML = "<button class=delete>Delete</button>";
        // alert("reached cell4.innerHTML");
    }
    let deleteButtons = document.getElementsByClassName('delete');
    // following lines of code only run inside the loadFruit() function, not outside of it.
    // code below runs the number of times that delete is pressed
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        button.addEventListener('click', deleteRow);
    }
    function deleteRow(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateTotalFruit();
    }
    // alert("updateTotalFruit() should run next");
    updateTotalFruit()
}