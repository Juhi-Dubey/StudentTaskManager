import {useState, useEffect} from 'react';
import axios from "axios";

function AddTaskForm({
    editingTask,
    setEditingTask,
    setRefresh
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setDueDate(
                editingTask.dueDate.split("T")[0]
            );
        }
    }, [editingTask]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(editingTask){
                await axios.put(
                    `http://localhost:5000/api/tasks/${editingTask._id}`,
                    {
                        title,
                        description,
                        priority,
                        dueDate
                    }
                );

                alert("Task Updated Successfully");
                setEditingTask(null);
                setRefresh((prev) => !prev);
            }
            else{
                await axios.post(
                    `http://localhost:5000/api/tasks/`,
                    {
                        title,
                        description,
                        priority,
                        dueDate
                    }
                );

                alert("Task Added Successfully");
                setRefresh((prev) => !prev);
            }
            

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
            <h2>{editingTask
                ? "Update Task"
                : "Add Task"}
            </h2>

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
                {editingTask
                    ? "Update Task"
                    : "Add Task"}
            </button>
        </form>
    );
}



export default AddTaskForm;