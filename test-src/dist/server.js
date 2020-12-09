const express = require('express');
const app = express();

const PORT = process.env.PORT | 4000;

app.get('/', (req, res) => {
  res.json(req.headers);
})

app.get('/health', (req, res) => {
  res.end();
})

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);