var orderApi = 'http://localhost:3000/order';

function start() {
    getOrder(renderOrder);
    handleFindOrder_id()
}

start();

function getOrder(callback) {
    fetch(orderApi)
        .then((res) => res.json())
        .then(callback);
}
function findOrder(Order_id,callback){
    fetch(`${orderApi}/${Order_id}`)
        .then((res)=> res.json())
        .then(callback)
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
function renderFoundOrder(Order){
    var OrderDetailBlock = document.querySelector('#order-detail')
    var htmls = `
        <table>
            <thead>
                <tr>
                    <th>order_id</th>
                    <th>customer_name</th>
                    <th>product_name</th>
                    <th>order_quantity</th>
                    <th>total_money</th>
                    <th>payment_method</th>
                    <th>time_order</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${Order.order_id}</td>
                    <td>${Order.customer.customer_name}</td>
                    <td>${Order.product.product_name}</td>
                    <td>${Order.order_quantity}</td>
                    <td>${Order.total_money}</td>
                    <td>${Order.payment_method}</td>
                    <td>${Order.time_order}</td>
                </tr>
            </tbody>
        </table>
    `
    OrderDetailBlock.innerHTML=htmls
}
// Hàm xử lý sự kiện tìm kiếm order
function handleFindOrder_id() {
    var findForm = document.querySelector('#get-order-form');
    findForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var OrderId = document.querySelector('input[name="get-order-id"]').value;
        findOrder(OrderId, renderFoundOrder);
    });
}