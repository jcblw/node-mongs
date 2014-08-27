#!/usr/bin/env node

var 
Mongo = require( 'mongodb' ).MongoClient,
argv = require( 'minimist' )( process.argv.slice(2) ),
Transform = require( 'stream' ).Transform,
host = argv.h || 'localhost',
port = argv.p || '27017',
dbName = argv.db || argv.d,
collectionName = argv.collection || argv.c,
username = argv.user || argv.u,
password = argv.password || argv.pass || argv.k,
tranformStrings = new Transform( {
  objectMode: true
} );
tranformStrings._transform = transformToString;

function transformToString( chunk, enc, done ) {
  this.push( JSON.stringify( chunk ) + '\n' );
  done( );
}

function connectMongo( options, callback ) {

  var url = 'mongodb://' + options.host + ':' + options.port + '/' + options.database;

  Mongo.connect( url, callback );

}

function createStream( db, collection ) {

  var _collection = db.collection( collection );

  return _collection.find().stream();

}

if ( !( dbName && collectionName ) ) {
  process.stderr.write( 'You must include -d {databaseName} and -c {collectionName} for mongs to work' );
  return;
}

connectMongo({
  host: host,
  port: port,
  database: dbName
}, function( err, db ) {

  if ( err ) {
    process.stderr.write( err.message );
    return;
  }

  var stream = createStream( db, collectionName );

  stream
    .pipe( tranformStrings )
    .pipe( process.stdout );

  stream.on( 'end', process.exit.bind( process ) );

});