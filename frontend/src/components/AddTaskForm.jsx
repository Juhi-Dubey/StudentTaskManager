import {useState, useEffect} from 'react';
import api from "../api/axios.js";
import { useToast } from "./ToastProvider.jsx";

function AddTaskForm({
    editingTask,
    setEditingTask,
    setRefresh
}) {
    const toast = useToast();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate
                ? editingTask.dueDate.split("T")[0]
                : ""
            );
        }
    }, [editingTask]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            if(editingTask){
                await api.put(
                    `/tasks/${editingTask._id}`,
                    {
                        title,
                        description,
                        priority,
                        dueDate
                    }
                );

                toast.success("Task updated successfully");
                setEditingTask(null);
                setRefresh((prev) => !prev);
            }
            else{
                await api.post(
                    `/tasks`,
                    {
                        title,
                        description,
                        priority,
                        dueDate
                    }
                );

                toast.success("Task added successfully");
                setRefresh((prev) => !prev);
            }
            

            setTitle("");
            setDescription("");
            setPriority("medium");
            setDueDate("");
        }catch(error){
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
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
                required
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
            <div className="date-input-wrapper">
                <input
                    className="date-input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    aria-label="Due Date"
                />

                <span
                    className="date-input-icon"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 3V6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M17 3V6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M4 9H20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M8 13H8.01"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12 13H12.01"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M16 13H16.01"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            </div>

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Saving..."
                    : editingTask
                    ? "Update Task"
                    : "Add Task"}
            </button>
        </form>
    );
}



export default AddTaskForm;
