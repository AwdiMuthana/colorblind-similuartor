const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('./public/index.html');
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
