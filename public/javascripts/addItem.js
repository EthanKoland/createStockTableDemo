

async function fetchAllItems() {
    let response = await fetch('/testPage?operation=fetchAll');
    let data = await response.json()
    return data;
}




function updateItemTable(items) {
    let itemTable = document.getElementById("itemTable");

    //Clear the table
    while (itemTable.rows.length > 1) {
        itemTable.deleteRow(1);
    }

    //Update the table
    for (let i = 0; i < items.length; i++) {
        let row = itemTable.insertRow(i + 1);
        let id = row.insertCell(0);
        id.innerHTML = items[i]._id;
        let name = row.insertCell(1);
        name.innerHTML = items[i].name;
        let category = row.insertCell(2);
        category.innerHTML = items[i].category;

        let quantity = row.insertCell(3);
        quantity.innerHTML = items[i].quantity;

        let price = row.insertCell(4);
        price.innerHTML = items[i].price;
        
        let ageRequirement = row.insertCell(5);
        ageRequirement.innerHTML = items[i].ageRequirement;
        
    }
}

async function getKeys() {
    let response = await fetch('/testPage?operation=getKeys');
    let data = await response.json()
    return data;
}

async function addKeyOptions(){
    let keys = await getKeys();
    let keySelect = document.getElementById("itemFilterSelector");
    for(let i = 0; i < keys.length; i++){
        let option = document.createElement("option");
        option.text = keys[i];
        keySelect.add(option);
    }
}

async function filterItems(){
    console.log("Filtering Items")
    let key = document.getElementById("itemFilterSelector").value;
    //Order is swapped from because of how items are added to the table
    let order =  document.getElementById("ascendingOrder").checked ? -1 : 1;
    let data = await fetch(`/testPage?operation=orderItems&key=${key}&order=${order}`).then(response => response.json());
    console.log(data);
    updateItemTable(data);

}




addKeyOptions();