const database = require('../services/database')
// select 
exports.getAllCustomer = async (req,res)=>{
    try{
        const result = await database.pool.query('SELECT * FROM customer')
        return res.status(200).json(result.rows )
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};
// insert into 
exports.create_customer = async (req, res) => {
    try {
        const { customer_name, phone_number, email, age, address } = req.body;

        if (!customer_name || !phone_number || !email || !age || !address) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if customer_name already exists
        const existsResult = await database.pool.query({
            text: `SELECT EXISTS(SELECT * FROM customer WHERE customer_name = $1)`,
            values: [customer_name]
        });

        // Extract the boolean value from the result
        const exists = existsResult.rows[0].exists;

        if (exists) {
            return res.status(409).json({ error: `Customer name '${customer_name}' already exists` });
        }

        // Insert the new customer
        const result = await database.pool.query({
            text: 'INSERT INTO customer(customer_name, phone_number, email, age, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [customer_name, phone_number, email, age, address]
        });

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// update 
exports.update_customer = async (req, res) => {
    try {
        if (!req.body.customer_name) {
            return res.status(422).json({ error: 'name is required' });
        } else {
            const existsResult = await database.pool.query({
                text: `SELECT EXISTS(SELECT * FROM customer WHERE customer_name = $1)`,
                values: [req.body.customer_name]
            });

            // Extract the boolean value from the result
            const exists = existsResult.rows[0].exists;

            if (exists) {
                return res.status(409).json({ error: `name already exists` });
            }
        }

        const result = await database.pool.query({
            text: `
                UPDATE customer
                SET customer_name = $1
                WHERE customer_id = $2
                RETURNING *
            `,
            values: [
                req.body.customer_name,
                req.params.customer_id
            ]
        });

        if (result.rowCount == 0) {
            return res.status(404).json({ error: 'customer_id not found'});
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// delete value
exports.delete_customer = async (req,res) =>{
    try{
        const result = await database.pool.query({
            text: 'delete from customer where customer_id = $1',
            values: [req.params.customer_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error: 'customer_id not found'})
        }
        return res.status(404).send();
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};
// get customer by customer_id
exports.getCustomerByCustomer_id = async (req,res)=>{
    try{
        const result = await database.pool.query({
            text:`
                SELECT * FROM customer
                where customer_id=$1
            `,
            values: [req.params.customer_id]
        })
        if(result.rowCount===0){
            return res.status(404).json({error : 'customer not found'})
        }
        return res.status(200).json(result.rows[0]);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
};