const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

class Tool {
    constructor(id, name, category, amount) {
        this._id = Number(id);
        this._name = name;
        this._category = category;
        this._amount = Number(amount);

        this.#calculateState(this._amount);
    }

    set amount(_amount) {
        this._amount = Number(_amount);
        this.#calculateState(this._amount);
    }

    #calculateState(_amount) {
        if (amount >= 10) {
           this._state = "available";
        } else if (amount > 0) {
            this._state = "low stock";
        } else {
            this._state = "not available";
        }
    }
}

let tools = [];

app.use(cors());


//endpoint give data
app.get('/tools', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(tools);
});

//endpoint add tool
app.post('/tools', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    let tool = res.json();
    tools.push(tool);
});



