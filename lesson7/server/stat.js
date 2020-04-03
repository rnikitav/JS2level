const express = require('express');
const fs = require('fs');
const handlerStat = require('./handlerStat');
const routerStat = express.Router();

routerStat.get('/', (req, res) => {
    fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

routerStat.post('/', (req, res) => {
    handler(req, res, 'add', './server/db/userCart.json');
});

module.exports = routerStat;