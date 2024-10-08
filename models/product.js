const pool = require('../config/database');
const { responseData, responseMessage } = require('../Utils/responseHandler');


exports.insertProduct = (response, statement, data) => {
    // jalankan query
    
    pool.query(statement, data, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Gagal insert data!', error: err });
        }

        // jika request berhasil
        responseMessage(response, 201, 'Berhasil insert data!');
    });
};



// get data Data
exports.getProducts = async (response, statement) => {
    // jalankan query

    pool.query(statement, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        responseData(response, 200, rows);
    });
};

// get data by id
exports.getProduct = async (response, statement, id) => {
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
exports.updateProduct = (response, searchStatement, updateStatement, id, data) => {
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
exports.deleteProduct = (response, searchStatement, deleteStatement, id) => {
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