import express from "express";

const app = express();

app.get('/', (req, res) => {
  return res.send('Hey, everything is working!')
});

app.listen('4000', () => console.log('Server is running!'));