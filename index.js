/*
    Juttle Postgres Adapter
*/

var _ = require('underscore');
var util = require("util");
var SqlAdapterCommon = require('juttle-sql-adapter-common');
var url = require('url');
var Knex = require('knex');

var config_properties = ['user', 'pw', 'hostname', 'db', 'port'];

function _assign_knex_getter() {
    var db = require('juttle-sql-adapter-common/lib/db');
    db.getKnex = function(singleDBConfig, options) {
        options = options || {};

        var conf = _.clone(singleDBConfig);
        if (options.db) {
            conf.db = options.db;
        }

        var conn = getConnectionProperty(conf);

        return Knex({
            "client": "pg",
            "connection": conn
        });
    };
}

function getConnectionProperty(singleDBConfig) {
    _.each(config_properties, function(prop) {
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


function PostgresAdapter(config) {
    var baseSql = SqlAdapterCommon.call(this, config);
    _assign_knex_getter();

    baseSql.name = 'postgres';

    _.extend(baseSql.read.prototype, {
        procName: 'read-postgres',
        handleRawResponse: function (resp) {
            return resp.rows;
        },
        addPointFormatting: function (points, targets) {
            //postgres outputs aggregation targets as strings instead of numbers
            var self = this;
            if (this.aggregation_targets && this.aggregation_targets.length > 0) {
                _.each(points, function(pt) {
                    _.each(self.aggregation_targets, function(aggregation_field) {
                        if (pt.hasOwnProperty(aggregation_field)) {
                            var value = parseFloat(pt[aggregation_field]);
                            if (!isNaN(value)) {
                                pt[aggregation_field] = value;
                            }
                        }
                    });
                });
            }
        }
    });

    _.extend(baseSql.write.prototype, {
        procName: 'write-postgres'
    });

    return baseSql;
}

util.inherits(PostgresAdapter, SqlAdapterCommon);
module.exports = PostgresAdapter;
