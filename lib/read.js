'use strict';

let _ = require('underscore');
let SqlCommonRead = require('juttle-sql-adapter-common/lib/read');
let db = require('./db');

class Read extends SqlCommonRead {
    handleRawResponse(resp) {
        return resp.rows;
    }

    addPointFormatting(points, targets) {
        //postgres outputs aggregation targets as strings instead of numbers
        if (this.aggregation_targets && this.aggregation_targets.length > 0) {
            _.each(points, (pt) => {
                _.each(this.aggregation_targets, (aggregation_field) => {
                    if (pt.hasOwnProperty(aggregation_field)) {
                        let value = parseFloat(pt[aggregation_field]);
                        if (!isNaN(value)) {
                            pt[aggregation_field] = value;
                        }
                    }
                });
            });
        }
    }

    getDbConnection(options) {
        return db.getDbConnection(options);
    }
}
module.exports = Read;
