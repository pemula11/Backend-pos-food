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
    db.createTable('Product', {
      uid: { type: 'string', primaryKey: true },
      name: { type: 'string' },
      price: { type: 'int' },
      stock: { type: 'int' },
      description: { type: 'string' },

  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Product', callback);
};

exports._meta = {
  "version": 1
};
