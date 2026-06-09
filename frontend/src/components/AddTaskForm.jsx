import {useState} from 'react';
import axios from "axios";

function AddTaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    title,
                    description,
                    priority,
                    dueDate
                }
            );

            console.log(response.data);
            alert("Task Added Successfully");

            setTitle("");
            setDescription("");
            setPriority("medium");
            setDueDate("");
        }catch(error){
            console.error(error);
        }
    };


    return (
        <form 
            className="form-container"
            onSubmit={handleSubmit}
        > 
            <h2>Add Task</h2>

            <label>Title</label>
            <input
                type="text"    
                placeholder="Enter Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>
            <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label>Priority</label>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}    
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label>Due Date</label>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <button type="submit">
                Add Task
            </button>
        </form>
    );
}



export default AddTaskForm;