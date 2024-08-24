const { v4: uuidv4 } = require('uuid');
const { insertTransaction, getTransactions, updateTransaction, deleteTransaction, getTransaction } = require('../models/transaction');
const moment = require('moment');

// create product
exports.createData = (req, res) => {
    // buat variabel penampung data dan query sql
    const {customerId, productList} = req.body;
    
    
    if (customerId == null || productList == [] || productList == null) {
        return res.status(400).json({ message: 'Customer Id atau Product Id tidak boleh kosong' });
    }
    const data = { customerId };
    data.uid = uuidv4();
    data.transactionDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const querySql = 'INSERT INTO transaction SET ?';

    // masukkan ke dalam model
    insertTransaction(res, querySql, data, productList);
};

// show products
exports.readData = (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM transaction WHERE uid = ?';

    // masukkan ke dalam model
    getTransaction(res, querySql, req.params.id);
};

exports.readDatas = (req, res) => {
    // buat query sql
    const querySql = `SELECT transaction.uid, transaction.transactionDate, customer.name AS customerName, customer.email
	FROM transaction JOIN customer ON transaction.customerId = customer.uid`;

    // masukkan ke dalam model
    getTransactions(res, querySql);
};

exports.updateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM transaction WHERE uid = ?';
    const queryUpdate = 'UPDATE transaction SET ? WHERE uid = ?';

    // masukkan ke dalam model
    updateTransaction(res, querySearch, queryUpdate, req.params.id, data);
};

// delete transaction
exports.deleteData = (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM transaction WHERE uid = ?';
    const queryDelete = 'DELETE FROM transaction WHERE uid = ?';

    // masukkan ke dalam model
    deleteTransaction(res, querySearch, queryDelete, req.params.id);
};