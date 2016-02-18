var _ = require('underscore');
var url = require('url');
var TestUtils = require('juttle-sql-adapter-common/test/utils');

// One way to launch postgres:
// docker run --name postgres -p 5432:5432 -d postgres

function getConfig() {
    var connectionParams = {};

    if (process.env.PGHOSTADDR) { //local postgres install
        //env variables: http://www.postgresql.org/docs/8.4/static/libpq-envars.html
        connectionParams.hostname = process.env.PGHOSTADDR;

        if (process.env.PGDATABASE) {
            connectionParams.db = process.env.PGDATABASE;
        }
        if (process.env.PGUSER) {
            connectionParams.user = process.env.PGUSER;
        }
        if (process.env.PGPASSWORD) {
            connectionParams.pw = process.env.PGPASSWORD;
        }
        if (process.env.PGPORT) {
            connectionParams.port = process.env.PGPORT;
        }
    } else if (process.env.DOCKER_HOST) { //docker-machine postgres install
        connectionParams.hostname = url.parse(process.env.DOCKER_HOST).hostname;
    }

    _.defaults(connectionParams, {
        user: 'postgres',
        pw: '',
        hostname: 'localhost',
        db: 'postgres',
        port: '5432',
        id: 'default'
    });

    return connectionParams;
}

TestUtils.getAdapterClass = function () {
    return require('../');
};
TestUtils.getAdapterConfig = function () {
    return [
        getConfig(),
        {
            user: 'postgres',
            pw: '',
            hostname: 'nonhost',
            port: 5432,
            db: 'should_not_work',
            id: 'fake'
        }
    ];
};
module.exports = TestUtils;
