import express from 'express';

const app = express();
const port = process.env.PORT || 3001; // Ensure this port does not conflict with Vite's

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});