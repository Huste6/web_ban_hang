const database =  require('../services/database')
// select
exports.getAllProduct = async (req,res)=>{
    try{
        const result = await database.pool.query('SELECT * FROM product')
        return res.status(200).json(result.rows )
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};
// insert into
exports.create_product = async(req,res)=>{
    try{
        const {product_name,price,category} = req.body
        if(!product_name || !price || !category){
            return res.status(400).json({error:'Missing required fields'})
        }
        const existsResult = await database.pool.query({
            text:`SELECT EXISTS(SELECT * FROM product WHERE product_name = $1)`,
            values: [req.body.product_name]
        })
        const exists = existsResult.rows[0].exists;
        if(exists){
            return res.status(409).json({error:`product name ${req.body.product_name} already exist`})
        }
        const result = await database.pool.query({
            text:'INSERT INTO product(product_name,price,category,description) values ($1,$2,$3,$4)',
            values:[
                req.body.product_name,
                req.body.price,
                req.body.category,
                req.body.description ? req.body.description : null
            ]
        })
        return res.status(201).json(result.rows[0])
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};
// update
exports.update_product = async (req, res) => {
    try {
        if (!req.body.product_name) {
            return res.status(422).json({ error: 'name is required' });
        } else {
            const existsResult = await database.pool.query({
                text: `SELECT EXISTS (SELECT * FROM product WHERE product_name = $1)`,
                values: [req.body.product_name]
            });
            const exists = existsResult.rows[0].exists;
            if (exists) {
                return res.status(409).json({ error: `product_name ${req.body.product_name} already exists` });
            }
        }

        const result = await database.pool.query({
            text: `
                UPDATE product 
                SET product_name = $1
                WHERE product_id = $2
                RETURNING *
            `,
            values: [
                req.body.product_name,
                req.params.product_id 
            ]
        });

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'product_id not found' });
        }

        return res.status(200).json(result.rows[0]); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// delete value
exports.delete_product = async (req,res) =>{
    try{
        const result = await database.pool.query({
            text:'delete from product where product_id=$1',
            values:[req.params.product_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error: 'product_id not found'})
        }
        return res.status(404).send();
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}; 
// get product by product_id 
exports.getProductByProduct_id = async(req,res)=>{
    try{
        const result = await database.pool.query({
            text:`
                SELECT * FROM product
                where product_id = $1
            `,
            values:[req.params.product_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error:`product_id ${req.params.product_id} not found`})
        }
        return res.status(200).json(result.rows[0]);
    }catch(error){
        return res.status(500).json({error: error.message})
    }
};