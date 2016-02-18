# Juttle PostgreSQL Adapter

[![Build Status](https://travis-ci.org/juttle/juttle-postgres-adapter.svg?branch=master)](https://travis-ci.org/juttle/juttle-postgres-adapter)


PostgreSQL adapter for the [Juttle data flow
language](https://github.com/juttle/juttle), with read & write support.

## Examples

Read rows from your `logs` SQL table where the log `level` is `info`, with the
```juttle
read postgres -table 'logs' level = 'info'
```

Perform an equivalent query using the -raw option:

```juttle
read postgres -raw 'select * from "logs" where "level" = "info" limit 10000'
```

Add a `debug` option to return the final SQL query instead (before any pagination):

```juttle
read postgres -table "logs" -debug true level = "info"
```

will output: `{query: 'select * from "logs" where "level" = 'info' limit 10000'}`.

If you have time series data in your table, indicate the column with the
timestamp using the `timeField` option to paginate and sort data correctly:

```juttle
read postgres -timeField "create_time" -table "logs";
read postgres -timeField "create_time" -table "logs -from :2 days ago: -to :1 hour ago:;"
```

The content of the column indicated by `timeField` will appear as the `time`
field in resulting points.

## Installation

Like Juttle itself, the adapter is installed as a npm package. Both Juttle and
the adapter need to be installed side-by-side:

```bash
$ npm install juttle
$ npm install juttle-postgres-adapter
```

## Configuration

The adapter needs to be registered and configured so that it can be used from
within Juttle. To do so, use the following format when adding a Postgres configuration to your `~/.juttle/config.json` file:

```json
{
    "adapters": {
        "postgres": [{
            "hostname": "localhost",
            "port": 5432,
            "user": "postgres",
            "pw": "",
            "db": "postgres",
            "id": "default"
        }]
    }
}
```

### Read options

Name | Type | Required | Description
-----|------|----------|-------------
`table`   | string | yes | table to query
`raw` | string | no | send a raw SQL query to PostgreSQL
`debug` | boolean | no | output a query corresponding to current set of options and filters
`timeField` | string | no | assume date time column, `to` and `from` options will use this to limit rows by time. Include this option to sort results by time.
`fetchSize` | integer | no | row limit, defaults to 10000 records
`from` | moment | no | select points after this time (inclusive)
`to`   | moment | no | select points before this time (exclusive)
`db`   | string | no | select the database name to use in your instance
`id`   | string | no | select the config instance to use

### Write options

Name | Type | Required | Description
-----|------|----------|-------------
`table`   | string | yes | table to write points into
`db`   | string | no | select the database name to use in your instance
`id`   | string | no | select the config instance to use

## Numeric Types

When reading numeric data types of [variable storage size](http://www.postgresql.org/docs/9.1/static/datatype-numeric.html)
from PostgreSQL, values are treated as type `String` in juttle.
You may want to use `Number.fromString()` [function](http://juttle.github.io/juttle/modules/number/#numberfromstring)
in the juttle program if your data has numbers of these types.
When juttle reads fields of PostgreSQL `real` and `double precision` types, their values are treated as numbers.

## Time Zones

Use the `timestamp with time zone` [date type](http://www.postgresql.org/docs/9.2/static/datatype-datetime.html) in your postgres table to avoid time zone confusion. If your timestamp value does not have a time zone, Postgres will use the local system [TimeZone](http://www.postgresql.org/docs/9.2/static/runtime-config-client.html#GUC-TIMEZONE) parameter and then convert to UTC.

## Contributing

Contributions are welcome! Please file an issue or open a pull request.

To check code style and run unit tests:
```
npm test
```

Both are run automatically by Travis.
