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
    const todos = await Todo.find({});
    res.json(todos);
})

// POST create a todo
app.post('/api/todos', async (req, res) => {
    console.log(req.body);
    const todo = await Todo.create(req.body);
    res.json(todo);
})


app.listen(port, () => {
    console.log('Listening on port: ', port);
    connectDB();
})