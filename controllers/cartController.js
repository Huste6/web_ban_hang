const database =  require('../services/database')
// select cart join customer join product
exports.getCart = async (req,res)=>{
    try{
        const result = await database.pool.query(
            `
                SELECT 
                    ca.cart_id,
                    (
                        SELECT ROW_TO_JSON(customer_obj) 
                        FROM (
                            SELECT cs.customer_name
                            FROM customer AS cs
                            WHERE cs.customer_id = ca.customer_id
                        ) AS customer_obj
                    ) AS customer,
                    (
                        SELECT ROW_TO_JSON(product_obj) 
                        FROM (
                            SELECT pr.product_name
                            FROM product AS pr
                            WHERE pr.product_id = ca.product_id
                        ) AS product_obj
                    ) AS product
                FROM cart AS ca;
            `
        )
        return res.status(200).json(result.rows)
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
// find cart
exports.getCartByCartID = async (req,res)=>{
    try{
        const result = await database.pool.query({
            text:`
                SELECT 
                    ca.cart_id,
                    (
                        SELECT ROW_TO_JSON(customer_obj) 
                        FROM (
                            SELECT cs.customer_name
                            FROM customer AS cs
                            WHERE cs.customer_id = ca.customer_id
                        ) AS customer_obj
                    ) AS customer,
                    (
                        SELECT ROW_TO_JSON(product_obj) 
                        FROM (
                            SELECT pr.product_name
                            FROM product AS pr
                            WHERE pr.product_id = ca.product_id
                        ) AS product_obj
                    ) AS product
                FROM cart AS ca
                where ca.cart_id = $1
            `,
            values:[req.params.cart_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error: 'cart_id not found'})
        }
        return res.status(200).json(result.rows[0])
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}