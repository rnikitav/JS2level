const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const stat = require('./stat');
const app = express();

app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/cart', cartRouter);
app.use('/api/stat', stat);
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
