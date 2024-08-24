const pool = require('../config/database');
const { responseData, responseMessage } = require('../Utils/responseHandler');


exports.insertTransaction = async (response, statement, data, products = ["7e3bb8a5-4dbf-49a9-ad58-c56451812b2e"]) => {
    // jalankan query
    
    const queryTransaction = 'INSERT INTO transactionproductlist SET ?'

    try {
        pool.query(statement, data, (err, rows, field) => {
            // error handling
            console.log(data);
            if (err) {
                throw new Error(err);
            }
            // jika request berhasil
            const uid = data.uid;
            
                products.forEach(product => {
                
                    const productId = product.productId;
                    if (productId == null) {
                        return response.status(400).json({ message: 'Id tidak boleh kosong' });
                    }
                    const qty = product.qty || 1;
                    dataTransaction = { transactionId: uid, productId: productId, qty: qty };
                    pool.query(queryTransaction, dataTransaction, (err, rows, field) => {
                        if (err) {
                            throw new Error(err);
                        }
                    });
                });

          


            responseMessage(response, 201, 'Berhasil insert data!');
        });
    } catch (error) {
        return response.status(500).json({ message: 'Gagal insert data!', error: error });
    }

    
};


// get data Data
exports.getTransactions = async (response, statement) => {
    // jalankan query
    const queryProduct = `SELECT transaction.uid, product.uid AS productUid, product.name, product.price, transactionproductlist.qty  FROM transaction
	LEFT JOIN transactionproductlist ON transaction.uid = transactionproductlist.transactionId
	JOIN product ON transactionproductlist.ProductId = product.uid`;

        


    pool.query(queryProduct, async (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        pool.query(statement, (err, dataProduct, field) => {
            if (err) {
                return response.status(500).json({ message: 'Ada kesalahan', error: err });
            }
          
           const coba = dataProduct.map((row) => {
            
            const productList = rows.filter(product => product.uid == row.uid);
            console.log(productList);
            return {
                uid: row.uid,
                transactionDate: row.transactionDate,
                customer: {
                    name: row.customerName,
                    email: row.email
                },
                productList: productList
            }
        });

        // jika request berhasil
        responseData(response, 200, coba);
        });
       
        
    });
};

// get data by id
exports.getTransaction = async (response, statement, id) => {
    // jalankan query
    if (id == null) {
        return response.status(400).json({ message: 'Id tidak boleh kosong' });
    }
    pool.query(statement, id, (err, rows, field) => {
        // error handling
       
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        if (rows.length < 1) {
            return response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }

        // jika request berhasil
        responseData(response, 200, rows);
    });
};

// update data Data
exports.updateTransaction = (response, searchStatement, updateStatement, id, data) => {
    // jalankan query untuk melakukan pencarian data
    pool.query(searchStatement, id, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query update
            pool.query(updateStatement, [data, id], (err, rows, field) => {
                // error handling
                if (err) {
                    return response.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika update berhasil
                responseMessage(response, 200, 'Berhasil update data!');
            });
        } else {
            return response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
};

// delete Data
exports.deleteTransaction = (response, searchStatement, deleteStatement, id) => {
    // jalankan query untuk melakukan pencarian data
    pool.query(searchStatement, id, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query delete
            pool.query(deleteStatement, id, (err, rows, field) => {
                // error handling
                if (err) {
                    return response.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika delete berhasil
                responseMessage(response, 200, 'Berhasil hapus data!');
            });
        } else {
            return response.status(404).json({ success: false, message: 'Data tidak ditemukan!' });
        }
    });
};