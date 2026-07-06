// server.js — Node.js 22
import { createServer } from 'node:http';

const server = createServer(async (req, res) => {
  if (req.url === '/joke') {
    // Native fetch — no need for node-fetch or axios anymore
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ setup: joke.setup, punchline: joke.punchline }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js 22! Try visiting /joke');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
