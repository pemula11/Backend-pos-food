const { v4: uuidv4 } = require('uuid');
const { insertCustomer, getCustomers, updateCustomer, deleteCustomer, getCustomer } = require('../models/customer');
// create customer
exports.createData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    data.uid = uuidv4();
    const querySql = 'INSERT INTO customer SET ?';

    // masukkan ke dalam model
    insertCustomer(res, querySql, data);
};

// show customers
exports.readData = (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM customer WHERE uid = ?';

    // masukkan ke dalam model
    getCustomer(res, querySql, req.params.id);
};

exports.readDatas = (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM customer';

    // masukkan ke dalam model
    getCustomers(res, querySql);
};

exports.updateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM customer WHERE uid = ?';
    const queryUpdate = 'UPDATE customer SET ? WHERE uid = ?';

    // masukkan ke dalam model
    updateCustomer(res, querySearch, queryUpdate, req.params.id, data);
};

// delete customer
exports.deleteData = (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM customer WHERE uid = ?';
    const queryDelete = 'DELETE FROM customer WHERE uid = ?';

    // masukkan ke dalam model
    deleteCustomer(res, querySearch, queryDelete, req.params.id);
};