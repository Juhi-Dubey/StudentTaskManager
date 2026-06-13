import {useState, useEffect} from 'react';
import api from '../api/axios.js';
import TaskCard from "./TaskCard";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import { useToast } from "./ToastProvider.jsx";

function TaskList({ 
    setEditingTask,
    refresh
 }) {
    const toast = useToast();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("none");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const fetchTasks = async () =>{
        setLoading(true);

        try{
            const response = await api.get("/tasks");

            setTasks(response.data);
        }catch(error){
            console.error(error);
            toast.error(error.response?.data?.message || "Unable to load tasks");
        }finally{
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        setTaskToDelete(id);
    };

    const closeDeleteModal = () => {
        if(deleting){
            return;
        }

        setTaskToDelete(null);
    };

    const confirmDeleteTask = async () => {
        if(!taskToDelete){
            return;
        }

        setDeleting(true);

        try {
            await api.delete(`/tasks/${taskToDelete}`);

            toast.success("Task deleted successfully");
            setTaskToDelete(null);
            fetchTasks();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Unable to delete task");
        }finally{
            setDeleting(false);
        }
    };

    const toggleTaskStatus = async (id) => {
        try {
            await api.patch(`/tasks/${id}/toggle`);

            toast.info("Task status updated");
            fetchTasks();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Unable to update task");
        }
    };

    const searchedTasks = tasks.filter((task) => {
        const query = searchTerm.toLowerCase().trim();

        if(!query){
            return true;
        }

        return (
            task.title.toLowerCase().includes(query) ||
            (task.description || "").toLowerCase().includes(query)
        );
    });

    const filteredTasks = searchedTasks.filter((task) => {
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

        displayTasks.sort((a, b) =>{
            const priorityDifference = 
                priorityOrder[b.priority] - priorityOrder[a.priority];

                if(priorityDifference !== 0){
                    return priorityDifference;
                }

                return (
                    new Date(a.dueDate) - new Date(b.dueDate)
                );
        });
    }

    displayTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;

        return a.completed ? 1 : -1;
    });

    const editTask = (task) => {
        setEditingTask(task);
    }

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
        task => !task.completed
    ).length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const overdueTasks = tasks.filter(
        task => !task.completed && new Date(task.dueDate) < new Date()
    ).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );
    
    useEffect(() => {
        fetchTasks();
    }, [refresh]);

    const exportTasks = () => {
        const csvRows = [
            [
                "Title",
                "Description",
                "Priority",
                "Status",
                "Due Date"
            ]
        ];

        tasks.forEach((task) => {
            csvRows.push([
                task.title,
                task.description,
                task.priority,
                task.completed
                    ? "Completed"
                    : "Pending",
                new Date(
                    task.dueDate
                ).toLocaleDateString()
            ]);
        });

        const csvContent = csvRows
            .map((row) =>
                row.map((cell) =>
                    `"${cell}"`
                ).join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "student_tasks.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

        toast.success(
            "Tasks exported successfully"
        );
    };

    return (
        <div className="task-section">
            <div className="task-section-header">
                <h2>Tasks ({tasks.length})</h2>
                <button
                    className="export-btn"
                    onClick={exportTasks}
                >
                    Export CSV
                </button>
            </div>

            <div className="progress-section">
                <div className="progress-header">
                    <span>Task Progress</span>
                    <span>{progress}%</span>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`,
                            background:
                                progress < 30
                                    ? "#ef4444"
                                    : progress < 70
                                        ? "#f59e0b"
                                        : "#22c55e"
                                                }}
                    ></div>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{totalTasks}</h3>
                    <p>Total</p>
                </div>

                <div className="stat-card">
                    <h3>{pendingTasks}</h3>
                    <p>Pending</p>
                </div>

                <div className="stat-card">
                    <h3>{completedTasks}</h3>
                    <p>Completed</p>
                </div>

                <div className="stat-card">
                    <h3>{overdueTasks}</h3>
                    <p>Overdue</p>
                </div>
            </div>

            <div className="search-box">
                <label htmlFor="task-search">Search Tasks</label>
                <input
                    id="task-search"
                    type="text"
                    placeholder="Search by title or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-bar">
                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button
                    className={filter === "pending" ? "active-filter" : ""}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>
                <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={() => setFilter("completed")}
                >
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
                loading && (
                    <p className="empty-state">Loading tasks...</p>
                )
            }

            {
                !loading && displayTasks.length === 0 && (
                    <div className="empty-state">
                        <p className="empty-state-icon">📝</p>
                        <h3>No tasks found</h3>
                        <p>
                            {tasks.length === 0
                                ? "Create your first task to get started."
                                : "Try a different search, filter, or sort option."}
                        </p>
                    </div>
                )
            }

            {
                !loading && displayTasks.map((task) => (
                    <TaskCard 
                        key={task._id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleTaskStatus={toggleTaskStatus}
                        editTask={editTask}
                    />
                ))
            }

            <DeleteConfirmModal
                isOpen={Boolean(taskToDelete)}
                onCancel={closeDeleteModal}
                onDelete={confirmDeleteTask}
                deleting={deleting}
            />
        </div>
    );
}

export default TaskList;
