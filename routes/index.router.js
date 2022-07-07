const { fetchAllTodos, postNewTodo, updateTodoTime } = require('../controllers/todo.controller');
const { fetchActiveWS, fetchTaskWS, createNewWS, updateWS } = require('../controllers/worksession.controller')
const express = require('express');

const router = express.Router();

router.get('/', fetchAllTodos);
router.post('/', postNewTodo);
router.get('/worksession/active', fetchActiveWS);
// sending back worksessions from the same task if they exist
router.get('/worksessions/:todoID', fetchTaskWS);
router.post('/worksession', createNewWS);
router.patch('/worksession/:id/end', updateWS);
router.patch('/todo/:id/:timeDiff', updateTodoTime);

module.exports = router;