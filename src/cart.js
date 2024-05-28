var cartAPI = 'http://localhost:3000/cart';

function start() {
    getCart(renderCart);
}

start();

function getCart(callback) {
    fetch(cartAPI)
        .then((res) => res.json())
        .then(callback);
}

function renderCart(carts) {
    var CartListBlock = document.querySelector('#cart-table-body');
    var htmls = carts.map((cart) => {
        return `
            <tr>
                <td>${cart.cart_id}</td>
                <td>${cart.customer.customer_name}</td>
                <td>${cart.product.product_name}</td>
            </tr>
        `;
    });
    CartListBlock.innerHTML = htmls.join('');
}
