var productApi = 'http://localhost:3000/product';

function start() {
    getProduct(renderProduct);
    handleCreateProduct();
    handleUpdateProduct();
    handleFindProduct();
}

start();

// functions 
function getProduct(callback) {
    fetch(productApi)
        .then((res) => res.json())
        .then(callback);
}

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(productApi, options)
        .then((res) => res.json())
        .then(callback);
}

function updateProduct(productId, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(`${productApi}/${productId}`, options)
        .then((res) => res.json())
        .then(callback);
}

function deleteProduct(productId, callback) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    };
    fetch(`${productApi}/${productId}`, options)
        .then((res) => res.json())
        .then(callback);
}

function findProduct(productId, callback) {
    fetch(`${productApi}/${productId}`)
        .then((res) => res.json())
        .then(callback);
}

function renderFoundProduct(product) {
    var productDetailBlock = document.querySelector('#product-detail');
    var html = `
        <table>
            <thead>
                <tr>
                    <th>product_id</th>
                    <th>product_name</th>
                    <th>price</th>
                    <th>category</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${product.product_id}</td>
                    <td>${product.product_name}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                </tr>
            </tbody>
        </table>
    `;
    productDetailBlock.innerHTML = html;
}

function renderProduct(products) {
    var productListBlock = document.querySelector('#product-table-body');
    var htmls = products.map((product) => {
        return `
            <tr>
                <td>${product.product_id}</td>
                <td>${product.product_name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>${product.description}</td>
                <td><button onclick="handleDeleteProduct(${product.product_id})">X</button></td>
            </tr>
        `;
    });
    productListBlock.innerHTML = htmls.join('');
}

function handleCreateProduct() {
    var createForm = document.querySelector('#product-create-form');
    createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var productName = document.querySelector('input[name="product-name"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var category = document.querySelector('input[name="category"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            product_name: productName,
            price: price,
            category: category,
            description: description
        };
        createProduct(formData, () => {
            getProduct(renderProduct);
        });
    });
}

function handleDeleteProduct(productId) {
    deleteProduct(productId, () => {
        getProduct(renderProduct);
    });
}

function handleUpdateProduct() {
    var updateForm = document.querySelector('#product-update-form');
    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var productId = document.querySelector('input[name="update-product-id"]').value;
        var productName = document.querySelector('input[name="update-product-name"]').value;
        var price = document.querySelector('input[name="update-price"]').value;
        var category = document.querySelector('input[name="update-category"]').value;
        var description = document.querySelector('input[name="update-description"]').value;

        var formData = {
            product_name: productName,
            price: price,
            category: category,
            description: description
        };
        updateProduct(productId, formData, () => {
            getProduct(renderProduct);
        });
    });
}

function handleFindProduct() {
    var findForm = document.querySelector('#get-product-form');
    findForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var productId = document.querySelector('input[name="get-product-id"]').value;
        findProduct(productId, renderFoundProduct);
    });
}
