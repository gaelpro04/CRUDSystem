const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const database = require('better-sqlite3');
const db = new database('inventory.db');

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

//table tools
db.prepare(`CREATE TABLE IF NOT EXISTS tools (
    _id INTEGER PRIMARY KEY,
    _name TEXT,
    _category TEXT,
    _amount TEXT,
    _state TEXT
    )`).run();

app.use(cors());
app.use(express.json());


//endpoint that gives data
app.get('/tools', (req, res) => {
    console.log("Se dio lista");
    const tools = db.prepare('SELECT * FROM tools').all();
    res.json(tools);
});

app.get('/tools/:id', (req, res) => {
    console.log("Se obtuvo tool");
    let id = Number(req.params.id);
    let tool = db.prepare('SELECT * FROM tools WHERE _id = ?').get(id);
    res.json(tool);
});

//endpoint add tool
app.post('/tools', (req, res) => {
    console.log("Se agrego tool");
    let tool1 = req.body;
    let new1 = new Tool(0, tool1._name, tool1._category, tool1._amount);

    let tool = db.prepare('SELECT * FROM tools WHERE _name = ?').get(new1._name);
    if (tool) {
        new1.amount = Number(tool._amount) + Number(new1._amount)
        db.prepare('UPDATE tools set _amount = ?, _state = ? WHERE _id = ?').run(new1._amount, new1._state, tool._id);
        new1._id = tool._id;
        res.status(200).json(new1);
    } else {
         const result = db.prepare('INSERT INTO tools (_name, _category, _amount, _state) VALUES (?, ?, ?, ?)').run(new1._name, new1._category, new1._amount, new1._state);
         new1._id = result.lastInsertRowId;
         res.status(201).json(new1);
    }
});

//endpoint to modify tool
app.put('/tools/:id', (req, res) => {
    console.log("Se modifico tool");
    let id = Number(req.params.id);
    let tool = req.body;
    
    console.log("MODIFICACION: " + tool._category + " ID: " + id);
    let newTool = new Tool(0, tool._name, tool._category, tool._amount);

    db.prepare('UPDATE tools SET _name = ?, _category = ?, _amount = ?, _state = ? WHERE _id = ?').run(newTool._name, newTool._category, newTool._amount, newTool._state, id);
    res.status(201).json(tool);
});

//endpoint to delete a tool
app.delete('/tools/:id', (req, res) => {
    console.log("Se obtuvo lista");
    let id = Number(req.params.id);
    db.prepare('DELETE FROM tools WHERE _id = ?').run(id);
    res.status(204).send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
