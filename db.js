var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

mkdirp.sync('./var/db');

// that's really cool, but why not just create a file?
var db = new sqlite3.Database('./var/db/todos.db', err => {
  if (err) return console.error(err.message);
});

(function rundb() {

  console.log('running db')
  db.run("CREATE TABLE IF NOT EXISTS todos(\
      id INTEGER PRIMARY KEY, \
      title TEXT NOT NULL, \
      description TEXT, \
      total_time BIGINT, \
      completed_time BIGINT, \
      completed BOOLEAN, \
      abandoned BOOLEAN \
    )");
  return db;
})();


  
  // create an initial user (username: alice, password: letmein)
  // var salt = crypto.randomBytes(16);
  // db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
  //   'alice',
  //   crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'),
  //   salt
  // ]);


module.exports = db;
