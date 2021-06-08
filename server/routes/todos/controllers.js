const uuid = require("uuid");
const asyncHandler = require("express-async-handler");
const { getCollection } = require("../../database/astraClient");

const getTodos = asyncHandler(async (req, res, next) => {
  const todos = await getCollection();

  try {
    const astraRes = await todos.find({});

    const formattedTodos = Object.keys(astraRes).map((id) => {
      const { completed, text } = astraRes[id];
      return { id, completed, text };
    });

    res.send(formattedTodos);
  } catch (error) {
    next(error);
  }
});

const createTodo = asyncHandler(async (req, res, next) => {
  const todos = await getCollection();

  try {
    const astraRes = await todos.create(uuid.v1(), req.body);
    res.send(astraRes);
  } catch (error) {
    next(error);
  }
});

const updateTodo = asyncHandler(async (req, res, next) => {
  const todos = await getCollection();

  try {
    const astraRes = await todos.update(req.body.id, req.body);
    res.send(astraRes);
  } catch (error) {
    next(error);
  }
});

const deleteTodo = asyncHandler(async (req, res, next) => {
  const todos = await getCollection();

  try {
    const astraRes = await todos.delete(req.body.id);
    res.send(astraRes);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
