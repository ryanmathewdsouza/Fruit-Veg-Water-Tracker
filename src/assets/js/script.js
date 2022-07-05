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
    // add row to table and insert cells
    let row = table.insertRow(-1);
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

// calculate total water and fill total-water cell with value
function updateTotalWater() {
    let table = document.getElementById("consumed-table");
    let subTotal = Array.from(table.rows).slice(1).reduce((total, row) => {
        return total + parseFloat(row.cells[2].innerHTML.replace('L', ''));
    }, 0);
    let totalWater = document.getElementById("total-water");
    totalWater.innerHTML = "<h2>" + subTotal.toFixed(2) + "L</h2>";
    if (totalWater.innerHTML === "<h2>0.00L</h2>") {
        totalWater.innerHTML = "<h2>0L</h2>";
    }
}