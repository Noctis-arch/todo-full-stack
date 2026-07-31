import express from 'express';

const router = express.Router();

import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo';

// GET todos
router.get('/', getTodos)

// POST create a todo
router.post('/', createTodo)

// DELETE remove a todo
router.delete('/:id', deleteTodo)

// PUT updating a todo
router.put('/:id', updateTodo);

export default router;