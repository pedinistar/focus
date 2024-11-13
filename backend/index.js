const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require("./Models/Todo")
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/test    ")

app.post('/add', (req, res)=>{
    const task = req.body.task
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get', (req, res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { isDone } = req.body;
    TodoModel.findByIdAndUpdate(id, { isDone }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
    .then(result => res.json({ message: "Task deleted", result }))
    .catch(err => res.json(err));
});


app.listen(3001, ()=>{
    console.log("Server is running...");
    
})