'use strict';

let SqlCommonWrite = require('juttle-sql-adapter-common/lib/write');
let db = require('./db');

class Write extends SqlCommonWrite {
    getDbConnection(options) {
        return db.getDbConnection(options);
    }
}
module.exports = Write;
