const database = require('../services/database')
// select 
exports.getAllDelivery = async (req,res)=>{
    try{
        const result = await database.pool.query('SELECT * FROM delivery')
        return res.status(200).json(result.rows )
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};
// insert into 
exports.create_delivery = async (req, res) => {
    try {
        const { order_id, receiver_name, phone_number, address, status } = req.body;
        if (!order_id || !receiver_name || !phone_number || !address || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if receiver_name, phone_number, address exists in customer
        const existsResult = await database.pool.query({
            text: `SELECT EXISTS(SELECT 1 FROM customer WHERE customer_name = $1 AND phone_number = $2 AND address = $3)`,
            values: [receiver_name, phone_number, address]
        });
        const exists = existsResult.rows[0].exists;
        if (!exists) {
            return res.status(409).json({ error: `Customer with name ${receiver_name}, phone number ${phone_number}, and address ${address} does not exist in the customer table` });
        }
        
        // Check if order_id exists in order table 
        // phải đặt rồi mới có đơn mà ship chứ :))
        const existsResult_1 = await database.pool.query({
            text: `SELECT EXISTS(SELECT * FROM "Order" WHERE order_id = $1)`,
            values: [order_id]
        });
        const exists_1 = existsResult_1.rows[0].exists;
        if (!exists_1) {
            return res.status(409).json({ error: `Order with ID ${order_id} does not exist in the order table` });
        }

        // Insert the new delivery
        const result = await database.pool.query({
            text: 'INSERT INTO delivery(order_id, receiver_name, phone_number, address, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [order_id, receiver_name, phone_number, address, status]
        });
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// delete value
exports.delete_delivery = async (req,res)=>{
    try{
        const result = await database.pool.query({
            text:'delete from delivery where delivery_id = $1',
            values: [req.params.delivery_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error: 'delivery_id not found'})
        }
        return res.status(404).send()
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
