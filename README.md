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
within Juttle. To do so, add the following to your `~/.juttle/config.json` file:

```json
{
    "adapters": {
        "juttle-postgres-adapter": {
            "connection": "postgres://postgres@localhost:5432/postgres"
        }
    }
}
```

The `connection` key should point to your PostgreSQL instance.

More documentation on the connection string can be found in the [knex.js documentation](http://knexjs.org/#Installation-client)

### Read options

Name | Type | Required | Description
-----|------|----------|-------------
`table`   | string | yes | table to query
`raw` | string | no | send a raw SQL query to PostgreSQL
`debug` | boolean | no | output a query corresponding to current set of options and filters
`timeField` | string | no | assume date time column, `to` and `from` options will use this to limit rows by time
`fetchSize` | integer | no | row limit, defaults to 10000 records
`from` | moment | no | select points after this time (inclusive)
`to`   | moment | no | select points before this time (exclusive)

### Write options

Name | Type | Required | Description
-----|------|----------|-------------
`table`   | string | yes | table to write points into

## Contributing

Contributions are welcome! Please file an issue or open a pull request.

To check code style and run unit tests:
```
npm test
```

Both are run automatically by Travis.

When developing you may run into failures during linting where jscs complains
about your coding style and an easy way to fix those files is to simply run
`jscs --fix test` or `jscs --fix lib` from the root directory of the project.
After jscs fixes things you should proceed to check that those changes are
reasonable as auto-fixing may not produce the nicest of looking code.
