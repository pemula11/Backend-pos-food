require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/database');
const productRouter = require('./routes/products');
const customerRouter = require('./routes/customers');
const transactionRouter = require('./routes/transactions');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// set routing
app.use('/api/product', productRouter);
app.use('/api/customer', customerRouter);
app.use('/api/transaction', transactionRouter);



// app.get('/', async function(req, res) {
//     const rows = await db.getDatas('test');
//     if (!rows){
//         return res.status(404).json({
//             status: 'error',
//             message: 'data not found'
//         });
//     }

//     return res.json({
//         status: 'success',
//         data: rows
//     })
//   });

//   app.get('/:id', async function(req, res) {
//     const rows = await db.getDataById('test', req.params.id);
//     if (rows.length < 1 || rows.error){
//         return res.status(404).json({
//             status: 'error',
//             message: 'data not found'
//         });
//     }
//     return res.json({
//         status: 'success',
//         data: rows
//     })
//   });

// app.post('/', async function(req, res) {
//     const data  ={ ...req.body};
//     const rows = await db.insertData('test', data);
//     return res.json({
//         status: 'success',
//         data: rows
//     })
// });

// app.put('/:id', async function(req, res) {
//     const data  ={ ...req.body};
//     const rows = await db.updateData('test', data, req.params.id);
    
//     if (rows !== 'success'){
//         return res.status(404).json({
//             status: 'error',
//             message: 'data not found'
//         });
//     }
//     return res.json({
//         status: 'success',
//         data: rows
//     })
// });

// app.delete('/:id', async function( req, res) {
//     const rows = await db.deleteData('test', req.params.id);
//     if (rows  !== 'success'){
       
//         return res.status(404).json({
//             status: 'error',
//             message: rows.message
//         });
//     }
//     return res.json({
//         status: 'success',
//         data: rows
//     })
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  