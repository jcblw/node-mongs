var
spawn = require('child_process').spawn
Mongo = require('mongodb'), 
mongs = require('../index')
db = {};
  
describe('node-mongs', function() {
  before(function(done) {
    Mongo.connect('mongodb://localhost:27017/mongs-test', function(err, connection) {
      if (err)
        return done(err)

      db = connection.collection('mongs')
      db.drop()
      db.insert({test: 'document'}, done)
    })
  })

  describe('cli', function() {
    it('should spit out documents', function(done){
      var proc = spawn('./bin/mongs', ['-d', 'mongs-test', '-c', 'mongs'])
      proc.stdout.setEncoding('utf8')
      proc.stderr.setEncoding('utf8')

      proc.stdout.on('data', function(data) {
        if (data.match(/"test"\:"document"/))
          done()
      })

      proc.stderr.on('data', function(data) {
        return done(new Error(data))
      })
    })
  })

  describe('js api', function() {
    it('should spit out documents', function(done) {
      var stream = mongs({
        db: 'mongs-test',
        collection: 'mongs'
      })

      stream.on('data', function(data) {
        if (data.match(/"test"\:"document"/))
          done()
      })
    })
  })

})
