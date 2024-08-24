require('dotenv').config();
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
    multipleStatements: true
});

async function getDatas(table) {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM ${table}`);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
        return err;
    }
    
}
async function getDataById(table, id) {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM ${table} where id = ${id}`);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function insertData(table, data) {
    try {
        const [rows, fields] = await pool.query(`INSERT INTO ${table} SET ?`, data);
        return rows, fields;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function updateData(table, data, id) {
    try {
        const querySelected = `SELECT * FROM ${table} WHERE id = ${id}`;
        const selected = await pool.query(querySelected);
        console.log(selected);
        if (selected[0].length < 1){
            console.log('data not found');
             throw new Error('data not found');
        }
        const [rows, fields] = await pool.query(`UPDATE ${table} SET ? WHERE id = ${id}`, data);
        return 'success';
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function deleteData(table, id) {
    try {
        const querySelected = `SELECT * FROM ${table} WHERE id = ${id}`;
        const selected = await pool.query(querySelected);
       
        if (selected[0].length < 1){
            
             throw new Error('data not found', 404);
        }
        const [rows, fields] = await pool.query(`DELETE FROM ${table} WHERE id = ${id}`);
        return 'success';
    }
    catch (err) {
        console.log(err);
        return err; 
    }
}


module.exports = pool;
