const db = require('../db');

const fetchActiveWS = (req, res) => {
  
}
const createNewWS = (req, res) => {
  const { start_time, todoID } = req.body;
  db.run("INSERT INTO worksessions(start_time, todoID) VALUES(?, ?) RETURNING*;", [start_time, todoID], function (err) {
    currentId = this.lastID;
    console.log(start_time)
    if (err) {
      console.log(err);
        res.sendStatus(500)
    } else {
      db.all('SELECT * FROM worksessions WHERE id = ?;', [currentId], function(err, data) {
        if (err) {
          res.sendStatus(500)
        } else {
          res.json(data)
        }
      })
      }
  })
}

module.exports = { fetchActiveWS, createNewWS };