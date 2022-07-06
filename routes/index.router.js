const { fetchAllTodos, postNewTodo } = require('../controllers/todo.controller');
const { fetchActiveWS, fetchTaskWS, createNewWS } = require('../controllers/worksession.controller')
const express = require('express');

const router = express.Router();

router.get('/', fetchAllTodos);
router.post('/', postNewTodo);
router.get('/worksession/active', fetchActiveWS);
// sending back worksessions from the same task if they exist
router.get('worksessions/:taskID', fetchTaskWS)
router.post('/worksession', createNewWS);

module.exports = router;