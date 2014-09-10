[![https://travis-ci.org/jcblw/node-mongs](https://travis-ci.org/jcblw/node-mongs.svg)](https://travis-ci.org/jcblw/node-mongs)
# Mongs

a command line tool to stream [mongodb](http://www.mongodb.com/) data to terminal so it can be piped to things like [dat](http://dat-data.org)

## Install

    $ npm install mongs -g

## Usage

    $ mongs -d databaseName -c collectionName [ -h host -p port ]

you can pipe the results to dat

    $ mongs -d project -c geopoints | dat import --json --primary=_id  

you can also access remote urls and even authenticate 

    $ mongs --user test --password 1234 -h hello.example.com -p 49153 -d sample -c locations

## Wishlist

- allow for javascript api
- better intergration into dat
- better name

