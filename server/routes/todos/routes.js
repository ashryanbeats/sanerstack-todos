const express = require('express');
const router = express.Router();
const controllers = require("./controllers");

router.get('/', controllers.getTodos);
router.post('/', controllers.createTodo);
router.put('/', controllers.updateTodo);
router.delete('/', controllers.deleteTodo);

module.exports = router;
