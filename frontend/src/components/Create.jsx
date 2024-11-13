import { useState } from "react";
import axios from "axios";

const Create = ({ addTodo }) => {
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        axios.post('http://localhost:3001/add', { task })
        .then(result => {
            addTodo(result.data);  // Add the new task to the list
            setTask('');           // Clear the input after adding
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="mb-8">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="outline-none border-2 border-zinc-700 mr-2 rounded-lg p-2 bg-transparent"
            />
            <button className="bg-white text-black py-2 px-3 rounded-md" type="button" onClick={handleAddTask}>+</button>
        </div>
    );
}

export default Create;