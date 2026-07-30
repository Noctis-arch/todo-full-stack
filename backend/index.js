import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import connectDB from './db.js';

import todoRoutes from './routes/todo.js'

const app = express();

const port = 3000;

// allow requests from frontend
app.use(cors());

// format incoming data to json
app.use(express.json());

// bring in the todo routes
app.use('/api/todos', todoRoutes)

// start the server
app.listen(port, () => {
    console.log('Listening on port: ', port);
    connectDB();
})