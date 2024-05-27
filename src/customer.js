// Khai báo URL của API cho khách hàng
var customerApi = 'http://localhost:3000/customer';

// Hàm bắt đầu
function start() {
    // Lấy danh sách khách hàng và hiển thị khi trang được tải
    getCustomers(renderCustomer);
    // Xử lý thêm khách hàng mới
    handleCreateCustomer();
    // Xử lý cập nhật thông tin khách hàng
    handleUpdateCustomer();
    // Xử lý tìm kiếm khách hàng
    handleFindCustomer();
}

start();

// Hàm gọi API để lấy danh sách khách hàng
function getCustomers(callback) {
    fetch(customerApi)
        .then((res) => res.json())
        .then(callback);
}

// Hàm gọi API để tạo khách hàng mới
function createCustomer(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(customerApi, options)
        .then((res) => res.json())
        .then(callback);
}

// Hàm gọi API để cập nhật thông tin khách hàng
function updateCustomer(customerId, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(`${customerApi}/${customerId}`, options)
        .then((res) => res.json())
        .then(callback);
}

// Hàm gọi API để xóa khách hàng
function deleteCustomer(customerId, callback) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    };
    fetch(`${customerApi}/${customerId}`, options)
        .then((res) => res.json())
        .then(callback);
}

// Hàm gọi API để tìm kiếm khách hàng theo ID
function findCustomer(customerId, callback) {
    fetch(`${customerApi}/${customerId}`)
        .then((res) => res.json())
        .then(callback);
}

// Hàm hiển thị thông tin khách hàng tìm được
function renderFoundCustomer(customer) {
    var customerDetailBlock = document.querySelector('#customer-detail');
    var htmls = `
        <table>
            <thead>
                <tr>
                    <th>customer_id</th>
                    <th>customer_name</th>
                    <th>telephone</th>
                    <th>email</th>
                    <th>age</th>
                    <th>address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${customer.customer_id}</td>
                    <td>${customer.customer_name}</td>
                    <td>${customer.phone_number}</td>
                    <td>${customer.email}</td>
                    <td>${customer.age}</td>
                    <td>${customer.address}</td>
                </tr>
            </tbody>
        </table>
    `;
    customerDetailBlock.innerHTML = htmls;
}

// Hàm hiển thị danh sách khách hàng
function renderCustomer(customers) {
    var customerListBlock = document.querySelector('#customer-table-body');
    var htmls = customers.map((customer) => {
        return `
            <tr>
                <td>${customer.customer_id}</td>
                <td>${customer.customer_name}</td>
                <td>${customer.phone_number}</td>
                <td>${customer.email}</td>
                <td>${customer.age}</td>
                <td>${customer.address}</td>
                <td><button onclick="handleDeleteCustomer(${customer.customer_id})">X</button></td>
            </tr>
        `;
    });
    customerListBlock.innerHTML = htmls.join('');
}

// Hàm xử lý sự kiện thêm khách hàng mới
function handleCreateCustomer() {
    var createForm = document.querySelector('#customer-create-form');
    createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var customerName = document.querySelector('input[name="customer-name"]').value;
        var telephone = document.querySelector('input[name="telephone"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var age = document.querySelector('input[name="age"]').value;
        var address = document.querySelector('input[name="address"]').value;

        var formData = {
            customer_name: customerName,
            phone_number: telephone,
            email: email,
            age: age,
            address: address
        };
        createCustomer(formData, () => {
            getCustomers(renderCustomer);
        });
    });
}

// Hàm xử lý sự kiện xóa khách hàng
function handleDeleteCustomer(customerId) {
    deleteCustomer(customerId, () => {
        getCustomers(renderCustomer);
    });
}

// Hàm xử lý sự kiện cập nhật thông tin khách hàng
function handleUpdateCustomer() {
    var updateForm = document.querySelector('#customer-update-form');
    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var customerId = document.querySelector('input[name="update-customer-id"]').value;
        var customerName = document.querySelector('input[name="update-customer-name"]').value;
        var formData = {
            customer_name: customerName
        };
        updateCustomer(customerId, formData, () => {
            getCustomers(renderCustomer);
        });
    });
}

// Hàm xử lý sự kiện tìm kiếm khách hàng
function handleFindCustomer() {
    var findForm = document.querySelector('#get-customer-form');
    findForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var customerId = document.querySelector('input[name="get-customer-id"]').value;
        findCustomer(customerId, renderFoundCustomer);
    });
}
