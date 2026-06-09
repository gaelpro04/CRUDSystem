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
        if (_amount >= 10) {
           this._state = "available";
        } else if (_amount > 0) {
            this._state = "low stock";
        } else {
            this._state = "not available";
        }
    }
}

let tools = [];

app.use(cors());
app.use(express.json());


//endpoint give data
app.get('/tools', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json(tools);
});

//endpoint add tool
app.post('/tools', (req, res) => {
    let tool = req.body;
    let new1 = new Tool(getLastID() + 1, tool._name, tool._category, tool._amount);
    tools.push(new1);
    res.status(201).json(new1);
});

//endpount to modify tool
app.put('/tools/:id', (req, res) => {
    let id = Number(req.param.id);
    let tool = req.body;

    for (let tool1 of tools) {
        if (tool1._id === id) {
            tool1._name = tool._name;
            tool1._category = tool._category;
            tool1.amount = tool._amount;
            break;
        }
    }
    res.status(200).send();
});

//endpoint to delete a tool
app.delete('/tools/:id', (req, res) => {
    let id = Number(req.params.id);
    tools = tools.filter(t => t._id !== id);
    res.status(204).send();
});

function getLastID() {
    let id = -1;
    let tool = tools.pop();
    console.log(tool);

    if (tool != null) {
        id = tool._id;
        tools.push(tool);
    }
    console.log(id);
    return Number(id);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
