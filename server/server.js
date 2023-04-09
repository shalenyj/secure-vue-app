const express = require('express');
const cors = require('cors')

const PORT = 3003;

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const messages = [];

app.post('/message', (req, res) => {
  const { text } = req.body;
  messages.push(text);
  res.status(200).json({ msg: 'Added '})
})

app.get('/message', (req, res) => {
  res.status(200).json({ items: messages })
})

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`)
} )