var inventoryApi = 'http://localhost:3000/inventory';

function start() {
    getInventory(renderInventory);
    handleFindInventory();
}

start();

function getInventory(callback) {
    fetch(inventoryApi)
        .then((res) => res.json())
        .then(callback);
}

function findInventory(inventory_id, callback) {
    fetch(`${inventoryApi}/${inventory_id}`)
        .then((res) => res.json())
        .then(callback);
}

function renderInventory(inventories) {
    var inventoryListBlock = document.querySelector('#inventory-table-body');
    var htmls = inventories.map((inventory) => {
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

function renderFoundInventory(inventory) {
    var inventoryDetailBlock = document.querySelector('#inventory-detail');
    var html = `
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
                    <td>${new Date(inventory.latest_received_date).toLocaleDateString()}</td>
                </tr>
            </tbody>
        </table>
    `;
    inventoryDetailBlock.innerHTML = html;
}

// Event handler for finding inventory by ID
function handleFindInventory() {
    var findForm = document.querySelector('#get-inventory-form form'); // Correct reference to the form
    findForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var inventoryId = document.querySelector('#get-inventory-id').value; // Correct reference to the input
        findInventory(inventoryId, renderFoundInventory);
    });
}
