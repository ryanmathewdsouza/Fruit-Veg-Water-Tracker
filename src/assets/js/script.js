// add event listener to water-add button
let waterAddButton = document.getElementById("water-add")
waterAddButton.addEventListener('click', addWater);

function test() {
    alert("calling test() as expected");
}

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
    // following lines of code only run inside the addWater function, not outside of it
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        button.addEventListener('click', deleteRow)
        // button.addEventListener('click', test)
        // deleteTandooriButtons[i].onclick = test;
    }
    function deleteRow(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateBasketTotal();
    }
}