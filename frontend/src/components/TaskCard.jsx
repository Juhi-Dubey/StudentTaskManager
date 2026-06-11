

function TaskCard({ task,
    deleteTask,
    toggleTaskStatus,
    editTask
}) {
    return (
        <div className={task.completed ? "task-card completed-task" : "task-card"}>
            <div className="task-card-header">
                <h3 className={task.completed ? "completed-title" : ""}>
                    {task.title}
                </h3>
                <span className={task.completed ? "status completed" : "status pending"}>
                    {task.completed
                        ? "Completed"
                        : "Pending"}
                </span>
            </div>

            <p>{task.description}</p>

            <p className={`priority ${task.priority}`}>
                Priority: {task.priority}
            </p>

            <p>
                <strong>Due Date:</strong> {" "} 
                {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <div className="task-actions">
                <button
                    className="edit-button"
                    onClick={() => 
                        editTask(task)
                    }
                >
                    Edit
                </button>

                <button
                    className="complete-button"
                    onClick={() =>
                        toggleTaskStatus(task._id)
                    }
                >
                    {task.completed
                        ? "Undo"
                        : "Complete"}
                </button>

                <button
                    className="delete-button"
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
