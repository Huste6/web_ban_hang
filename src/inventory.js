var inventoryApi = 'http://localhost:3000/inventory';

function start() {
    getinventory(renderinventory);
    handleFindInventory();
}

start();

function getinventory(callback) {
    fetch(inventoryApi)
        .then((res) => res.json())
        .then(callback);
}
function findInventory(inventory_id,callback){
    fetch(`${inventoryApi}/${inventory_id}`)
        .then((res)=>res.json())
        .then(callback)
}
function renderFindinventory(inventory){
    var inventoryDetailBlock = document.querySelector('#inventory-detail');
    var htmls = `
        <table>
            <thead>
                <tr>
                    <th>inventory_id</th>
                    <th>product_name</th>
                    <th>product_quantity</th>
                    <th>latest_received_date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${inventory.inventory_id}</td>
                    <td>${inventory.product.product_name}</td>
                    <td>${inventory.product_quantity}</td>
                    <td>${inventory.latest_received_date}</td>
                </tr>
            </tbody>
        </table>
    `;
    inventoryDetailBlock.innerHTML = htmls;
}
function renderinventory(inventorys) {
    var inventoryListBlock = document.querySelector('#inventory-table-body');
    var htmls = inventorys.map((inventory) => {
        return `
            <tr>
                <td>${inventory.inventory_id}</td>
                <td>${inventory.product.product_name}</td>
                <td>${inventory.product_quantity}</td>
                <td>${inventory.latest_received_date}</td>
            </tr>
        `;
    });
    inventoryListBlock.innerHTML = htmls.join('');
}
function handleFindInventory(){
    var findForm = document.querySelector('#get-inventory-form');
    findForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var inventory_id = document.querySelector('input[name="get-inventory-id"]').value;
        findCustomer(inventory_id, renderFindinventory);
    });
}