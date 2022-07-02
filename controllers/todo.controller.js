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

  const { title, description, times_per_week, total_time, completed_time, completed, abandoned } = req.body;

  db.run("INSERT INTO  todos(title,description,times_per_week,total_time,completed_time,completed, abandoned) VALUES (?, ?, ?, ?, ?, ?, ?)", [title, description, times_per_week, total_time, completed_time, completed, abandoned],
    (err) => {
      if (err) { res.status(500).send(err.message) }
      else {
        res.send('success')
      }
    })
}

module.exports = { fetchAllTodos, postNewTodo };