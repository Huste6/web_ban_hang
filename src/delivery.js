var deliveryApi = 'http://localhost:3000/delivery';

function start() {
    getdelivery(renderdelivery);
}

start();

function getdelivery(callback) {
    fetch(deliveryApi)
        .then((res) => res.json())
        .then(callback);
}

function renderdelivery(deliverys) {
    var deliveryListBlock = document.querySelector('#delivery-table-body');
    var htmls = deliverys.map((delivery) => {
        return `
            <tr>
                <td>${delivery.delivery_id}</td>
                <td>${delivery.order_id}</td>
                <td>${delivery.receiver_name}</td>
                <td>${delivery.phone_number}</td>
                <td>${delivery.address}</td>
                <td>${delivery.status}</td>
            </tr>
        `;
    });
    deliveryListBlock.innerHTML = htmls.join('');
}
