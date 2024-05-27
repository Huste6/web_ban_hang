var inventoryApi = 'http://localhost:3000/inventory';

function start() {
    getinventory(renderinventory);
}

start();

function getinventory(callback) {
    fetch(inventoryApi)
        .then((res) => res.json())
        .then(callback);
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
