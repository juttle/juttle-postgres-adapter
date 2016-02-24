/*
    Juttle Postgres Adapter
*/
'use strict';

let db = require('./db');

function PostgresAdapter(config) {
    db.init(config);

    return {
        name: 'postgres',
        read: require('./read'),
        write: require('./write'),
        optimizer: require('juttle-sql-adapter-common/lib/optimize')
    };
}

module.exports = PostgresAdapter;
