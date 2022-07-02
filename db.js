var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
const { fetchAllTodos } = require('./controllers/todo.controller');

mkdirp.sync('./var/db');

// that's really cool, but why not just create a file?
var db = new sqlite3.Database('./var/db/todos.db', err => {
  if (err) return console.error(err.message);
});

(function rundb() {
  console.log('running db')
  // the todo itself contains the planned time and days per week.
  db.run("CREATE TABLE IF NOT EXISTS todos(\
      id INTEGER PRIMARY KEY, \
      title TEXT NOT NULL, \
      description TEXT, \
      total_time_planned BIGINT, \
      total_time_studied BIGINT, \
      completed BOOLEAN, \
      abandoned BOOLEAN \
    )");
  // week creates the number of seconds (or miliseconds?) studied each day
  db.run("CREATE TABLE IF NOT EXISTS weeks(\
    id INTEGER PRIMARY KEY,\
    week_num INT,\
    day_0 BIGINT,\
    day_0_date TEXT,\
    day_1 BIGINT,\
    day_1_date TEXT,\
    day_2 BIGINT,\
    day_2_date TEXT,\
    day_3 BIGINT,\
    day_3_date TEXT,\
    day_4 BIGINT,\
    day_4_date TEXT,\
    day_5 BIGINT,\
    day_6_date TEXT,\
    day_6 BIGINT,\
    day_7_date TEXT,\
    total_time BIGINT\
    todoID REFERENCES todos(id)\
    )");
  // worksession row is added when the user clicks start and runs until the user clicks end or until some time that has yet to be decided over has passed.
  // if it is incomplete, the user is asked how long they studied that day. Else, the session date is checked for another session with the same todo reference and the
  // time added to the weekday. the session can then be deleted
  db.run("CREATE TABLE IF NOT EXISTS worksessions(\
    id INTEGER PRIMARY KEY,\
    date TEXT,\
    start_time TEXT,\
    end_time TEXT,\
    todoID REFERENCES todos(id)\
    )")
  return db;
})();


  


module.exports = db;
