const db = require('../db');

const fetchAllTodos = (req, res, next) => {
  db.all('SELECT * FROM todos;', [], (err, data) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log(data)
      res.status(200).json(data);
    }
  })
}


const postNewTodo = (req, res, next) => {
  // const { title, description, times_per_week, total_time_planned, completed_time, completed, abandoned } = req.body;
  const { title, minutes } = req.body;
  // Haha, lexical scoped arrow functions don't work that well as callbacks. What a waste of time!!!
  db.run("INSERT INTO todos(title,total_minutes_planned) VALUES(?, ?) RETURNING *;", [title, minutes], function(err){
    currentId = this.lastID;
    if (err) {
      console.log(err);
        res.sendStatus(500)
    } else {
      db.all('SELECT * FROM todos WHERE id = ?;', [currentId], function(err, data) {
        if (err) {
          res.sendStatus(500)
        } else {
          console.log(data)
          res.json(data)
        }
      })
      }
    });
}

const updateTodoTime = (req, res) => {
  const { id, timeDiff } = req.params;
  // incoming in miliseconds, converts miliseconds to minutes
  const minutes = Math.floor(parseInt(timeDiff)/60000)
  db.run('UPDATE todos SET total_minutes_studied=? WHERE id=?;', [minutes, id], function (err, rows) {
    if (err) {
      console.log('error in next route todo/timeDiff', err.message);
      res.sendStatus(500)
    } else {
      db.all('SELECT * FROM todos WHERE id = ?;', [id], function (err, data) {
        if (err) {
          res.sendStatus(500)
        } else {
          console.log(data)
          res.json(data)
        }
      })
    }
  })
}
module.exports = { fetchAllTodos, postNewTodo, updateTodoTime };