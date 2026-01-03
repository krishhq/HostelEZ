const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mock data - replace with a database in a real application
let users = [];
let complaints = [];
let leaves = [];
let attendance = [];
let logs = [];
let skips = [];

// Endpoints for users
app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// Endpoints for complaints
app.get('/api/complaints', (req, res) => res.json(complaints));
app.post('/api/complaints', (req, res) => {
    const complaint = req.body;
    complaints.push(complaint);
    res.status(201).json(complaint);
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});