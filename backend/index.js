import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import connectDB from './db.js';

import Todo from './models/todo.js'

const app = express();

const port = 3000;

// allow requests from frontend
app.use(cors());

// format incoming data to json
app.use(express.json());

// GET todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message })
    }
})

// POST create a todo
app.post('/api/todos', async (req, res) => {
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
app.delete('/api/todos/:id', async (req, res) => {
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
app.put('/api/todos/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
        console.log(result);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(400).json({ error: e.message })
    }
});


app.listen(port, () => {
    console.log('Listening on port: ', port);
    connectDB();
})