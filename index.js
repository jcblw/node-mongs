var 
Mongo = require( 'mongodb' ).MongoClient,
JSONStream = require('JSONStream')
through = require('through')

module.exports = exportMongo

function exportMongo(options) {
  if (!options.db)
    throw new Error('You must include -d {databaseName} for mongs to work')
  if (!options.collection)
    throw new Error('You must include -c {collectionName} for mongs to work')

  var 
  host = options.host || 'localhost',
  port = options.port || '27017',
  dbName = options.db,
  collectionName = options.collection
  auth = ( options.user ) ? options.user + ':' + options.password + '@' : '',
  url = 'mongodb://' + auth + host + ':' + port + '/' + dbName;
  output = null

  if (options.stdout) {
    output = through(function (data) {
      process.stdout.write(data)
    }, function() {
      process.exit()
    })
  } else {
    output = through(function (data) {
      this.emit('data', data)
    })
  }

  Mongo.connect( url, function(err, db) {
    if (err)
      output.write(err.message)

    db.collection(collectionName)
      .find()
      .stream()
      .pipe(JSONStream.stringify(false))
      .pipe(output)

  });

  return output
}
