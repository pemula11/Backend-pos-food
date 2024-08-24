const { v4: uuidv4 } = require('uuid');
const { insertProduct, getProducts, updateProduct, deleteProduct, getProduct } = require('../models/product');
// create product
exports.createData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    data.uid = uuidv4();
    const querySql = 'INSERT INTO product SET ?';

    // masukkan ke dalam model
    insertProduct(res, querySql, data);
};

// show products
exports.readData = (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM product WHERE uid = ?';

    // masukkan ke dalam model
    getProduct(res, querySql, req.params.id);
};

exports.readDatas = (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM product';

    // masukkan ke dalam model
    getProducts(res, querySql);
};

exports.updateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM product WHERE uid = ?';
    const queryUpdate = 'UPDATE product SET ? WHERE uid = ?';

    // masukkan ke dalam model
    updateProduct(res, querySearch, queryUpdate, req.params.id, data);
};

// delete product
exports.deleteData = (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM product WHERE uid = ?';
    const queryDelete = 'DELETE FROM product WHERE uid = ?';

    // masukkan ke dalam model
    deleteProduct(res, querySearch, queryDelete, req.params.id);
};