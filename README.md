# Mongs

a command line tool to stream [mongodb](http://www.mongodb.com/) data to terminal so it can be piped to things like [dat](http://dat-data.org)

## Install

    $ npm install mongs -g

## Usage

    $ mong -d databaseName -c collectionName [ -h host -p port ]

you can pipe the results to dat

    $ mong -d project -c geopoints | dat import --json --primary=_id  

> it is in early stages so expect the unexpected

## Wishlist

- allow for javascript api
- better intergration into dat
- better name

