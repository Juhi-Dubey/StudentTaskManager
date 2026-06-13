

function TaskCard({ task,
    deleteTask,
    toggleTaskStatus,
    editTask
}) {

    const isOverDue = !task.completed && new Date(task.dueDate) < new Date();

    return (
        <div
            className={
                task.completed
                    ? "task-card completed-task"
                    : isOverDue
                        ? "task-card overdue-task"
                        : "task-card"
            }
        >   
            <div className="task-card-header">
                <h3>{task.title}</h3>

                <div className="status-group">
                    <span className={task.completed
                        ? "status completed"
                        : isOverDue
                            ? "status overdue"
                            : "status pending"}
                    >
                        {
                            task.completed
                                ? "Completed"
                                : isOverDue
                                    ? "Overdue"
                                    : "Pending"
                        }
                    </span>

                    
                </div>
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
