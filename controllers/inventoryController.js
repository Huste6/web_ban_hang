const database = require('../services/database')
// select 
exports.getInventory = async (req,res)=>{
    try{
        const result = await database.pool.query(`
            select iv.inventory_id,
                (select ROW_TO_JSON(product_obj) from (
                    select pr.product_name
                    from product as pr
                    where pr.product_id = iv. product_id
                ) as product_obj) as product,
                iv.product_quantity,iv.latest_received_date
            from inventory as iv
        `)
        return res.status(200).json(result.rows )
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

exports.getInventoryById = async (req,res)=>{
    try{
        const result = await database.pool.query({
            text:`
            select iv.inventory_id,
                (select ROW_TO_JSON(product_obj) from (
                    select pr.product_name
                    from product as pr
                    where pr.product_id = iv. product_id
                ) as product_obj) as product,
                iv.product_quantity,iv.latest_received_date
            from inventory as iv
            where iv.inventory_id = $1
            `,
            values: [req.params.inventory_id]
        })
        if(result.rowCount===0){
            return res.status(404).json({error: 'inventory not found'})
        }
        return res.status(200).json(result.rows[0])
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}