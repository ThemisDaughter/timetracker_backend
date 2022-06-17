const { fetchAllTodos, postNewTodo } = require('../controllers/todo.controller');
const express = require('express');

const router = express.Router();

router.get('/', fetchAllTodos);
router.post('/', postNewTodo);

module.exports = router;