
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

// Async Await for handling database operations in real scenarios
app.get('/todos', async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating database read delay
        res.json(todos);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/todos', async (req, res) => {
    const { todo } = req.body;
    if (todo) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating database write delay
        todos.push(todo);
        res.status(201).send('success');
    } else {
        res.status(400).send('failure');
    }
});

// Delete a todo
app.delete('/todos/:index', async (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < todos.length) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating database delete operation
        todos.splice(index, 1);
        res.status(200).send('Deleted successfully');
    } else {
        res.status(404).send('Todo not found');
    }
});

const PORT = 5007;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

