import express from 'express';

const router = express.Router();

import Todo from '../models/todo.js'

// GET todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message })
    }
})

// POST create a todo
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message })
    }
})

// DELETE remove a todo
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        console.log(result);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message })
    }
})

// PUT updating a todo
router.put('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
        console.log(result);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message })
    }
});

export default router;