'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('TransactionProductList', {
    
    transactionId: { 
      type: 'string', 
      foreignKey: {
        name: 'transaction_uid_product_list_fk',
        table: 'Transaction',
        mapping: 'uid',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      }
    },
    ProductId: { 
      type: 'string', 
      foreignKey: {
        name: 'product_uid_product_list_fk',
        table: 'Product',
        mapping: 'uid',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      }
    }
}, callback);
};

exports.down = function(db, callback) {
  db.dropTable('TransactionProductList', callback)
};

exports._meta = {
  "version": 1
};
