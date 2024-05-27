
var productApi = 'http://localhost:3000/product'

fetch(productApi)
    .then((res)=>{
        return res.json();
    })
    .then(function(product){
        console.log(product);
    })
    .catch((error)=>{
        console.log('error: ',error)
    });

