'use strict';

const e = require("express");

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
  db.createTable('Customer', {
    uid: { type: 'string', primaryKey: true },
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },

}, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Customer', callback);
};

exports._meta = {
  "version": 1
};
