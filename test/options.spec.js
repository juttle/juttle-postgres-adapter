var expect = require('chai').expect;
var TestUtils = require('./conf');
var check_juttle = TestUtils.check_sql_juttle;

require('juttle-sql-adapter-common/test/options.spec');

describe('unknown column error', function() {
    before(function() {
        TestUtils.init();
        return TestUtils.createTables(['logs_create']);
    });
    it('sql time usage with invalid timeField when paginating', function() {
        return check_juttle({
            program: 'read sql -fetchSize 100 -timeField "wrong_time_field" -table "logs_create" | reduce -every :3 days: avg = avg(code)'
        })
        .then(function(result) {
            expect(result.warnings).to.have.length(0);
            expect(result.sinks.table).to.have.length(0);

            expect(result.errors).to.have.length(1);
            expect(result.errors[0])
                .to.match(/"wrong_time_field" (is undefined|does not exist)| Unknown column 'wrong_time_field'/);
        });
    });
});
