const db = require('../db');

const fetchAllTodos = (req, res, next) => {
  console.log('function running')
  db.all('SELECT * FROM todos', [], (err, data) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('should be sending data')
      res.status(200).json(data);
    }
  })
}

const postNewTodo = (req, res, next) => {

  // const { title, description, times_per_week, total_time_planned, completed_time, completed, abandoned } = req.body;
  const { title, hours } = req.body;
  // db.run("INSERT INTO  todos(title,description,times_per_week,total_time_planned,completed_time,completed, abandoned) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING;", [title, description, times_per_week, total_time, completed_time, completed, abandoned],
  db.run("INSERT INTO todos(title,total_time_planned) VALUES (?, ?) RETURNING *;", [title, hours], (err, row) => {
      if (err) {
        res.sendStatus(500)
      } else {
        console.log(row)
      }
    });
}

module.exports = { fetchAllTodos, postNewTodo };