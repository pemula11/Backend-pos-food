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
  db.createTable('Transaction', {
    uid: { type: 'string', primaryKey: true },
    customerId: { 
      type: 'string', 
      foreignKey: {
        name: 'transaction_uid_user_uid_fk',
        table: 'Customer',
        mapping: 'uid',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      }
    },
    transactionDate: { type: 'datetime' },
}, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Transaction', callback)
};

exports._meta = {
  "version": 1
};
