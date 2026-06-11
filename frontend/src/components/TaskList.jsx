import {useState, useEffect} from 'react';
import axios from 'axios';
import TaskCard from "./TaskCard";

function TaskList({ 
    setEditingTask,
    refresh
 }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("none");

    const fetchTasks = async () =>{
        try{
            const response = await axios.get(
                "http://localhost:5000/api/tasks"
            );

            setTasks(response.data);
        }catch(error){
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/tasks/${id}`
            );

            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTaskStatus = async (id) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/tasks/${id}/toggle`
            );

            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if(filter === "pending"){
            return !task.completed;
        }
        if(filter === "completed"){
            return task.completed;
        }
        return true;
    });

    const displayTasks = [...filteredTasks];

    if(sortBy === "dueDate"){
        displayTasks.sort(
            (a, b) =>
                new Date(a.dueDate) - new Date(b.dueDate)
        );
    }

    if(sortBy === "priority"){
        const priorityOrder = {
            high: 3,
            medium: 2,
            low: 1,
        };

        displayTasks.sort(
            (a, b) =>
                priorityOrder[b.priority] - priorityOrder[a.priority]
        );
    }

    const editTask = (task) => {
        setEditingTask(task);
    }
    
    useEffect(() => {
        fetchTasks();
    }, [refresh]);

    return (
        <div>
            <h2>Tasks ({tasks.length})</h2>

            <div className="filter-bar">
                <button onClick={() => setFilter("all")}>
                    All
                </button>
                <button onClick={() => setFilter("pending")}>
                    Pending
                </button>
                <button onClick={() => setFilter("completed")}>
                    Completed
                </button>

            </div>

            <div className="sort-bar">
                <label>
                    Sort By:
                </label>
                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                >
                    <option value="none">
                        None
                    </option>
                    <option value="priority">
                        Priority
                    </option>
                    <option value="dueDate">
                        Due Date
                    </option>
                </select>
            </div>
            
            {
                displayTasks.length === 0 && (
                    <p>No tasks found.</p>
                )
            }

            {
                displayTasks.map((task) => (
                    <TaskCard 
                        key={task._id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleTaskStatus={toggleTaskStatus}
                        editTask={editTask}
                    />
                ))
            }
        </div>
    );
}

export default TaskList;
