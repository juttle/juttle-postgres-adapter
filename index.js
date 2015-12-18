/*
    Juttle Postgres Adapter
*/

var _ = require('underscore');
var util = require("util");
var SqlAdapterCommon = require('juttle-sql-adapter-common');

function PostgresAdapter(config) {
    var clientSpecficConfig = {};

    if (config.connection) {
        clientSpecficConfig.knex = require('knex')({
            "client": "pg",
            "connection": config.connection
        });
    }

    var baseSql = SqlAdapterCommon.call(this, clientSpecficConfig);

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
                            pt[aggregation_field] = parseFloat(pt[aggregation_field]);
                            if (isNaN(pt[aggregation_field])) {
                                pt[aggregation_field] = null;
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
