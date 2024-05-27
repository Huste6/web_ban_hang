const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'nguyenngocquan',
    port: 5432,  
    database: 'BanHang'
});

// Test the connection (optional)
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully');
    release();
});

module.exports = {
    pool
};
