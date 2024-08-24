const { createData, readData, readDatas, deleteData, updateData } = require('../Controllers/ProductControllers');
const express = require('express');
const router = express.Router();

router.route('/').post(createData).get(readDatas);

router.route('/:id').get(readData).put(updateData).delete(deleteData);

module.exports = router;