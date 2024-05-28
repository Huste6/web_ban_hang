const database = require('../services/database')
// select
exports.getAllOrder = async (req,res)=>{
    try{
        const result = await database.pool.query(`
            select Od.order_id,
                (select ROW_TO_JSON(customer_obj) from (
                    select cs.customer_name
                    from customer as cs
                    where cs.customer_id = Od.customer_id
                ) as customer_obj) as customer,
                (select ROW_TO_JSON(product_obj) from (
                    select pr.product_name
                    from product as pr
                    where pr.product_id = Od.product_id
                ) as product_obj) as product,
                Od.order_quantity,Od.total_money,Od.payment_method,Od.time_order
            from "Order" as Od
        `)
        return res.status(200).json(result.rows )
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
exports.getOrderByOrderID = async (req,res)=>{
    try{
        const result = await database.pool.query({
            text:`
                select Od.order_id,
                    (select ROW_TO_JSON(customer_obj) from (
                        select cs.customer_name
                        from customer as cs
                        where cs.customer_id = Od.customer_id
                    ) as customer_obj) as customer,
                    (select ROW_TO_JSON(product_obj) from (
                        select pr.product_name
                        from product as pr
                        where pr.product_id = Od.product_id
                    ) as product_obj) as product,
                    Od.order_quantity,Od.total_money,Od.payment_method,Od.time_order
                from "Order" as Od
                where Od.order_id = $1
            `,
            values:[req.params.order_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error: 'order not found'})
        }
        return res.status(200).json(result.rows[0])
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}