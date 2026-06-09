

function TaskCard({ task,
    deleteTask,
    toggleTaskStatus
}) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                <strong>Priority:</strong> {task.priority}
            </p>

            <p>
                <strong>Due Date:</strong> {" "} 
                {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <p>
                <strong>Status:</strong> {" "}
                {
                    task.completed
                        ? "Completed"
                        : "Pending"
                }
            </p>
            
            <div className="task-actions">
                <button
                    onClick={() =>
                        toggleTaskStatus(task._id)
                    }
                >
                    {task.completed
                        ? "Undo"
                        : "Complete"}
                </button>

                <button
                    onClick={() =>
                        deleteTask(task._id)
                    }
                >
                    Delete
                </button>
            </div>
        </div>

        
    );
}

export default TaskCard;
