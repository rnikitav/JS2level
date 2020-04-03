const fs = require('fs');
const cart = require('./cart');

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del,
};

const handlerStat = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) =>{
        const newCart = actions[action](JSON.parse(data), req);
        let time = Date();
        let all = `${newCart} ${time}`;
        fs.writeFile(file, all, (err) => {
            if (err) {
                res.send('{"result": 0}');
            } else {
                res.send('{"result": 1}');
            }
        })
    })
};

module.exports = handlerStat;