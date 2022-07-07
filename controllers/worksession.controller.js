const db = require('../db');

const fetchActiveWS = (req, res) => {
  db.all('SELECT * FROM worksessions WHERE end_time IS NULL;', function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
}
const fetchTaskWS = (req, res) => {
  const {todoID} = req.params;
  db.all('SELECT * FROM worksessions WHERE todoID = ?;', [todoID], function (err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      console.log(data);
      res.json(data)
    }
  })
}
const createNewWS = (req, res) => {
  const { start_time, todoID } = req.body;
  db.run("INSERT INTO worksessions(start_time, todoID) VALUES(datetime(?), ?) RETURNING*;", [start_time, todoID], function (err) {
    const currentId = this.lastID;
    if (err) {
      console.log(err);
        res.sendStatus(500)
    } else {
      db.all('SELECT * FROM worksessions WHERE id = ?;', [currentId], function(err, data) {
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
const updateWS = (req, res) => {
  const { end_time } = req.body;
  const { id } = req.params;
  db.run("UPDATE worksessions SET end_time=datetime(?) WHERE id=?;", [end_time, id], function(err){
    const currentId = this.lastID;
    if (err) {
      res.sendStatus(500)
    } else {
      db.all('SELECT * FROM worksessions WHERE id = ?;', [currentId], function (err, data) {
        if (err) {
          res.sendStatus(500)
        } else {
          console.log('update d data', data)
          res.json(data)
        }
      })
    }
  })
}

module.exports = { fetchActiveWS, createNewWS, fetchTaskWS, updateWS };