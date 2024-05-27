const database = require('../services/database')

// select
exports.getAllrating = async (req,res)=>{
    try{
        const result = await database.pool.query('SELECT * FROM rating')
        return res.status(200).json(result.rows )
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
// update (rate star)
exports.update_rating = async (req,res)=>{
    try{
        const result = await database.pool.query({
            text:`
                update rating
                set rate_star = $1
                where rate_id = $2
                returning *
            `,
            values: [req.body.rate_star,req.params.rate_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error: 'rate_id not found'})
        }
        return res.status(200).json(result.rows[0])
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
// delete value
exports.delete_rate = async(req,res)=>{
    try{
        const result = await database.pool.query({
            text:'delete from rating where rate_id = $1',
            values: [req.params.rate_id]
        })
        if(result.rowCount==0){
            return res.status(404).json({error:'rate_id not found'})
        }
        return res.status(404).send()
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
