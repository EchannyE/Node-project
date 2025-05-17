// Basic API server with support for multiple concurrent connections using Node.js and Express

const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store (for demonstration)
let messages = [

    {
        "user": "Echanny",
        "text": "Hello Everyone"
    }
];

// GET endpoint to fetch all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST endpoint to add a new message
app.post('/api/messages', (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: 'User and text are required.' });
  }
  const message = { user, text, timestamp: new Date() };
  messages.push(message);
  res.status(201).json(message);
});

// Example endpoint to show concurrent requests
app.get('/api/slow', (req, res) => {
  // Simulate a slow operation (e.g., database or computation)
  setTimeout(() => {
    res.json({ message: 'This was a slow response.' });
  }, 3000); // 3 seconds delay
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Basic API server running at http://localhost:${PORT}/`);
});