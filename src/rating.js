var ratingApi = 'http://localhost:3000/rating';

function start() {
    getRating(renderRating);
}

start();

function getRating(callback) {
    fetch(ratingApi)
        .then((res) => res.json())
        .then(callback);
}

function renderRating(ratings) {
    var ratingListBlock = document.querySelector('#rating-table-body');
    var htmls = ratings.map((rating) => {
        return `
            <tr>
                <td>${rating.rate_id}</td>
                <td>${rating.customer_id}</td>
                <td>${rating.product_id}</td>
                <td>${rating.rate_star}</td>
                <td>${rating.comment}</td>
                <td>${rating.rate_time}</td>
            </tr>
        `;
    });
    ratingListBlock.innerHTML = htmls.join('');
}
