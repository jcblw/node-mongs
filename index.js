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

  var 
  auth = ( options.username ) ? options.username + ':' + options.password + '@' : '',
  url = 'mongodb://' + auth + options.host + ':' + options.port + '/' + options.database;

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
  database: dbName,
  username: username,
  password: password
}, function( err, db ) {

  if ( err ) {
    process.stderr.write( err.message );
    return;
  }

  function errorHandler( type, err ) {
    process.stderr.write( type );
    process.stderr.write( err.message );
    process.exit();
  }

  var stream = createStream( db, collectionName );

  stream
    .on( 'error', errorHandler.bind( null, 'Cursor Stream:' ) )
    .pipe( tranformStrings )
    .on( 'error', errorHandler.bind( null, 'Stream Transform:' ) )
    .pipe( process.stdout );



  stream.on( 'end', process.exit.bind( process ) );

});