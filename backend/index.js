import express from 'express';

const app = epress();

const port = 3000

app.get('/', (req,res) => {
    res.seend('Hello (from server)')
})

app.listen(port, () => {
    console.log('Listening on port: ', port);
})