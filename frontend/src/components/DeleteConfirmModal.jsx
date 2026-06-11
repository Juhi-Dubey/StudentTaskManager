function DeleteConfirmModal({
    isOpen,
    onCancel,
    onDelete,
    deleting
}) {
    if(!isOpen){
        return null;
    }

    return (
        <div
            className="modal-overlay"
            onClick={onCancel}
        >
            <div
                className="delete-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Delete Task</h2>
                <p>Are you sure you want to delete this task?</p>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-button"
                        onClick={onCancel}
                        disabled={deleting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="modal-delete-button"
                        onClick={onDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;
