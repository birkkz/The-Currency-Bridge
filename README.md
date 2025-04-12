# The Currency Bridge

A command-line tool to fetch real-time and historical currency exchange rates using the Frankfurter API.

## Usage

`node converter.js [options]`

## Options

* `amount`: Amount to convert (default: `1`).
* `base`: Base currency (default: `USD`).
* `symbols`: Comma-separated target currencies (default: `EUR,GBP,JPY,AUD`).
* `date`: `YYYY-MM-DD` for historical rates (default: `latest`).
* `-h` or `--help`: Show usage instructions.
* `--version`: Show script version.

## Examples

* `node converter.js amount=10 base=USD symbols=EUR,GBP`
* `node converter.js base=BRL symbols=CAD,EUR date=2024-01-15`
* `node converter.js --version`

## Default Values

`date=latest`, `amount=1`, `base=USD`, `symbols=EUR,GBP,JPY,AUD`

## Error Handling

Provides messages for invalid input and API errors.

## Version

Check with `--version`.

## API

Uses the Frankfurter API (https://api.frankfurter.dev/).
```