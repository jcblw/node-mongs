[![https://travis-ci.org/jcblw/node-mongs](https://travis-ci.org/jcblw/node-mongs.svg)](https://travis-ci.org/jcblw/node-mongs)
# Mongs [![Build Status](https://travis-ci.org/jcblw/node-mongs.svg?branch=master)](https://travis-ci.org/jcblw/node-mongs)

a command line tool to stream [mongodb](http://www.mongodb.com/) data to terminal so it can be piped to things like [dat](http://dat-data.org)

## Install

    $ npm install mongs -g

## Usage

### CLI

    $ mongs -d databaseName -c collectionName [ -h host -p port ]

you can pipe the results to dat

    $ mongs -d project -c geopoints | dat import --json --primary=_id  

you can also access remote urls and even authenticate 

    $ mongs --user test --password 1234 -h hello.example.com -p 49153 -d sample -c locations

### Javascript Api

Right now all mongs does is exports a stream of data

```javascript
var mongs = require( 'mongs' );
    stream = mongs({ 
      db: 'mongs-test',
      collection: 'mongs'
    });

  stream.pipe( fooTranform ).pipe( bar );
```

The api is the same as the CLI

### Api

Both the command line and javascript take these inputs

    -d, --db          - required the database name
    -c, --collection  - required the collection in the database
    -p, --port        - optional port of mongo database
    -h, --host        - optional host of mongo database
    -u, --user        - optional user for auth to mongo database
    -a, --password    - optional password for auth to mongo database

The javascript api takes the expanded versions of these flags.

## Wishlist

- better intergration into dat
- stream data into mongodb

