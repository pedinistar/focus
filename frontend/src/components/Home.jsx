import { useEffect, useState } from "react"
import { BsCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import Create from "./Create"
import axios from "axios"

const Home = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err)
      )
    }, [])

   const handleCheck = (id, isDone) => {
        axios.put(`http://localhost:3001/update/${id}`, { isDone: !isDone })
        .then(result => {
            // Update the local state after toggling
            setTodos(todos.map(todo => todo._id === id ? {...todo, isDone: !isDone} : todo));
        })
        .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(err => console.log(err));
    };

    // Add this function to update todos after adding a new task
    const addTodo = (newTask) => {
        setTodos([...todos, newTask]);
    };



  return (
    <div className="border-2 border-zinc-800 rounded-lg p-8 text-center">
            <h2 className="text-4xl uppercase font-semibold mb-8">.Focus</h2>
            <Create addTodo={addTodo} /> {/* Pass addTodo as a prop */}
            {todos.length === 0 ? (
                <div><h2>No Tasks.</h2></div>
            ) : (
                todos.map(({ _id, task, isDone }, index) => (
                    <div className="flex justify-between items-center mb-2" key={index}>
                        <div onClick={() => handleCheck(_id, isDone)} className="cursor-pointer checkbox flex justify-center items-center gap-3">
                            {isDone ? <BsCheckCircleFill /> : <BsCircleFill />}
                            <p style={{
                                textDecoration: isDone ? 'line-through' : 'none',
                                color: isDone ? 'yellow' : 'inherit'
                            }}>
                                {task}
                            </p>
                        </div>
                        <div>
                            <span onClick={() => handleDelete(_id)}><BsFillTrashFill className="cursor-pointer" /></span>
                        </div>
                    </div>
                ))
            )}
        </div>
  )
}

export default Home