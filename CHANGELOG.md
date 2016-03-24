# Change Log
This file documents all notable changes to the juttle-postgres-adapter. The release numbering uses [semantic versioning](http://semver.org).

## 0.6.0
Released 2016-03-23

### Major Changes
- Support JuttleAdapterAPI 0.7.0

## 0.5.1
Released 2016-03-09

### Major Changes
- Use new checkJuttle test utility api

## 0.5.0
Released 2016-02-24

### Major Changes
- Use new adapter API: Made compatible with Juttle 0.5.0.
- Use new allowedOptions shared logic.
- Make Filter class extending from ASTVisitor available from AdapterAPI.
- Change optimize class based on new graph changes.
- Refactor db to extend from shared db class.

## 0.4.0
Released 2016-02-18

### Major Changes
- `reduce -every` concurrent batch execution.
- Change in config style from connection string to object. Also allows array of credentials.
- Dynamically change credential object or database name.
- Large dataset pagination over time bug-fix.

## 0.3.1
Released 2016-02-08

### Major Changes
- Unit tests refactored such that you can use mocha to run files directly
- Empty Aggregate handling fix

## 0.3.0
Released 2016-02-05

### Major Changes
- Updated the dependencies to support the 0.4.0 juttle release.
- Updated to use new Adapter Read and Write API.

## 0.2.3
Released 2016-01-21

### Major Changes
- Updated the dependencies to support the 0.3.0 juttle release
- NOTICE: As part of the update to juttle 0.3.0, the configuration syntax for adapters changed from the name of the module ("juttle-postgres-adapter") to the type of the adapter ("postgres").

## 0.2.0
Released 2016-01-11

### Major Changes
- Updated the dependencies to support the 0.2.0 juttle release [#4]

## 0.1.0
Released 2015-12-19

### Major Changes
- Initial release
