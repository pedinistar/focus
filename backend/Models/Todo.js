const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    task: String,
    isDone: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = TodoModel