'use strict';

let _ = require('underscore');
let url = require('url');
let Knex = require('knex');

let SqlCommonDB = require('juttle-sql-adapter-common/lib/db');

let REQUIRED_CONFIG_PROPERTIES = ['user', 'pw', 'hostname', 'db', 'port'];

class DB extends SqlCommonDB {

    static getKnex(singleDBConfig, options) {
        options = options || {};

        let conf = _.clone(singleDBConfig);
        if (options.db) {
            conf.db = options.db;
        }

        let conn = this._getConnectionProperty(conf);

        return Knex({
            "client": "pg",
            "connection": conn
        });
    }

    static _getConnectionProperty(singleDBConfig) {
        _.each(REQUIRED_CONFIG_PROPERTIES, function(prop) {
            if (!singleDBConfig.hasOwnProperty(prop)) {
                throw new Error('Each configuration must contain a field: ' + prop);
            }
        });

        return url.format({
            protocol: 'postgres:',
            auth: singleDBConfig.user + ':' + singleDBConfig.pw,
            hostname: singleDBConfig.hostname,
            pathname: '/' + singleDBConfig.db,
            slashes: true,
            port: singleDBConfig.port
        });
    }
}
module.exports = DB;
