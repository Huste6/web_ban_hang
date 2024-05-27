var orderApi = 'http://localhost:3000/order';

function start() {
    getOrder(renderOrder);
}

start();

function getOrder(callback) {
    fetch(orderApi)
        .then((res) => res.json())
        .then(callback);
}

function renderOrder(orders) {
    var orderListBlock = document.querySelector('#order-table-body');
    var htmls = orders.map((order) => {
        return `
            <tr>
                <td>${order.order_id}</td>
                <td>${order.customer.customer_name}</td>
                <td>${order.product.product_name}</td>
                <td>${order.order_quantity}</td>
                <td>${order.total_money}</td>
                <td>${order.payment_method}</td>
                <td>${order.time_order}</td>
            </tr>
        `;
    });
    orderListBlock.innerHTML = htmls.join('');
}
