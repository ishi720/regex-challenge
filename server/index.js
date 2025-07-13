const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});