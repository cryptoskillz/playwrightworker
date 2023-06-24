const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(`grrr`);

  res.send('Hello from Express on Vercel!');
});



module.exports = app;