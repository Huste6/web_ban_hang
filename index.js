const express = require('express')
const cors = require('cors');
const database = require('./services/database')
const app = express()
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
});
app.use(cors());
app.use(express.json())

app.use(require('./routes/customerRoute'))
app.use(require('./routes/ratingRoute'))
app.use(require('./routes/productRoute'))
app.use(require('./routes/deliveryRoute'))
app.use(require('./routes/orderRoute'))
app.use(require('./routes/cartRoute'))
app.use(require('./routes/inventoryRoute'))

app.listen(3000,()=> console.log("started pj"))