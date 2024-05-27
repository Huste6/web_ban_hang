var inventoryApi = 'http://localhost:3000/cart';

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
    var inventoryListBlock = document.querySelector('#cart-table-body');
    var htmls = inventorys.map((cart) => {
        return `
            <tr>
                <td>${cart.cart_id}</td>
                <td>${cart.customer.customer_name}</td>
                <td>${cart.product.product_name}</td>
            </tr>
        `;
    });
    inventoryListBlock.innerHTML = htmls.join('');
}
