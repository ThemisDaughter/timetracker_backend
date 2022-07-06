const { fetchAllTodos, postNewTodo } = require('../controllers/todo.controller');
const { fetchActiveWS, createNewWS } = require('../controllers/worksession.controller')
const express = require('express');

const router = express.Router();

router.get('/', fetchAllTodos);
router.post('/', postNewTodo);
router.get('/worksession', fetchActiveWS);
router.post('/worksession', createNewWS);

module.exports = router;