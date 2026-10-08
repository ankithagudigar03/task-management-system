import { useEffect, useState } from "react";

import {
    getComments,
    createComment,
    deleteComment
} from "../services/taskApi";

function TaskDetails({ task, onClose }) {
    const [isClosing, setIsClosing] = useState(false);

const [comments, setComments] = useState([]);
const [commentText, setCommentText] = useState("");
const [commentsLoading, setCommentsLoading] = useState(false);
const [commentSubmitting, setCommentSubmitting] = useState(false);

useEffect(() => {
    if (!task) return;

    const loadComments = async () => {
        try {
            setCommentsLoading(true);

            const data = await getComments(task._id);

            setComments(data);
        } catch (error) {
            console.error("Failed to load comments:", error);
        } finally {
            setCommentsLoading(false);
        }
    };

    loadComments();
}, [task]);


    if (!task) {
        return null;
    }


    const handleAddComment = async (event) => {
    event.preventDefault();

    if (!commentText.trim()) {
        return;
    }

    try {
        setCommentSubmitting(true);

        const newComment = await createComment(
            task._id,
            commentText
        );

        setComments((prevComments) => [
            newComment,
            ...prevComments
        ]);

        setCommentText("");

    } catch (error) {
        console.error("Failed to add comment:", error);
    } finally {
        setCommentSubmitting(false);
    }
};




const handleDeleteComment = async (commentId) => {
    try {
        await deleteComment(commentId);

        setComments((prevComments) =>
            prevComments.filter(
                (comment) => comment._id !== commentId
            )
        );

    } catch (error) {
        console.error("Failed to delete comment:", error);
    }
};

const handleDeleteAttachment = async (attachmentId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/attachments/task/${task._id}/${attachmentId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to delete attachment"
            );
        }

        // Remove the attachment from the current task display
        task.attachments = task.attachments.filter(
            (attachment) => attachment._id !== attachmentId
        );

        // Force TaskDetails to refresh
        setComments((prev) => [...prev]);

    } catch (error) {
        console.error("Failed to delete attachment:", error);
    }
};

    return (
        <div className="task-details">

            {/* Header */}
            <div className="task-details-header">

                <div className="details-title">
                   <span
    className={`details-task-icon status-${task.status
        .toLowerCase()
        .replace(" ", "-")}`}
>
    {task.status === "TODO" && "📋"}

    {task.status === "IN PROGRESS" && "⚙️"}

    {task.status === "COMPLETED" && "✓"}
</span>
                    <div>
                        <h2>{task.title}</h2>

                        <span
                            className={`priority ${task.priority.toLowerCase()}`}
                        >
                            {task.priority}
                        </span>
                    </div>
                </div>

                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

            </div>

            {/* Description */}
            <div className="details-section">

                <h3>
                    📝 Description
                </h3>

                <div className="description-box">
                    {task.description || "No description"}
                </div>

            </div>

            {/* Task Information */}
            <div className="details-grid">

                <div className="detail-item">

    <span
        className={`detail-icon status-icon status-${task.status
            .toLowerCase()
            .replace(" ", "-")}`}
    >
        {task.status === "TODO" && "📋"}

        {task.status === "IN PROGRESS" && "⚙️"}

        {task.status === "COMPLETED" && "✓"}
    </span>

    <div>
        <strong>Status</strong>

        <span className="status-value">
            {task.status}
        </span>
    </div>

</div>

                <div className="detail-item">
                    <span className="detail-icon">
                        👤
                    </span>

                    <div>
                        <strong>Assigned To</strong>
                        <span>
                            {task.assignedTo || "Not assigned"}
                        </span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">
                        📅
                    </span>

                    <div>
                        <strong>Due Date</strong>
                        <span>
                            {task.dueDate
                                ? new Date(
                                      task.dueDate
                                  ).toLocaleDateString()
                                : "No due date"}
                        </span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">
                        🕐
                    </span>

                    <div>
                        <strong>Created</strong>
                        <span>
                            {task.createdAt
                                ? new Date(
                                      task.createdAt
                                  ).toLocaleString()
                                : "-"}
                        </span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">
                        🔄
                    </span>

                    <div>
                        <strong>Last Updated</strong>
                        <span>
                            {task.updatedAt
                                ? new Date(
                                      task.updatedAt
                                  ).toLocaleString()
                                : "-"}
                        </span>
                    </div>
                </div>

</div>


{/* Attachments */}
{task.attachments && task.attachments.length > 0 && (
    <div className="attachments-section">
        <h3>📎 Attachments</h3>

        <div className="attachments-list">
            {task.attachments.map((attachment) => (
                <div
                    className="attachment-item"
                    key={attachment._id}
                >
                    {attachment.fileType?.startsWith("image/") ? (
                        <img
                            src={attachment.fileUrl}
                            alt={attachment.fileName}
                            className="attachment-image"
                        />
                    ) : (
                        <div className="attachment-file-icon">
                            📄
                        </div>
                    )}

                    <div className="attachment-info">
                        <strong>
                            {attachment.fileName}
                        </strong>

                        <div className="attachment-actions">
                            <a
                                href={attachment.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open file
                            </a>

                            <button
                                    type="button"
                                    className="delete-attachment-button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDeleteAttachment(attachment._id);
                                    }}
                                >
                                  <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4h8v2" />
                                        <path d="M19 6l-1 14H6L5 6" />
                                        <path d="M10 11v5" />
                                        <path d="M14 11v5" />
                                    </svg>
                                </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}


{/* Comments */}
<div
    className="comments-section"
    onClick={(event) => event.stopPropagation()}
>

    <h3>💬 Comments</h3>

    <form
    className="comment-form"
    onClick={(event) => event.stopPropagation()}
    onSubmit={handleAddComment}
>
       <textarea
    value={commentText}
    onClick={(event) => event.stopPropagation()}
    onChange={(event) =>
        setCommentText(event.target.value)
    }
    placeholder="Write a comment..."
    rows="3"
/>

        <button
            type="submit"
            disabled={
                commentSubmitting ||
                !commentText.trim()
            }
        >
            {commentSubmitting
                ? "Adding..."
                : "Add Comment"}
        </button>
    </form>

    <div className="comments-list">

        {commentsLoading ? (
            <p>Loading comments...</p>
        ) : comments.length === 0 ? (
            <p>No comments yet.</p>
        ) : (
            comments.map((comment) => (
                <div
                    className="comment-item"
                    key={comment._id}
                >
                    <div className="comment-header">
                        <strong>
                            {comment.user?.name ||
                                comment.user?.email ||
                                "User"}
                        </strong>

                        <span>
                            {new Date(
                                comment.createdAt
                            ).toLocaleString()}
                        </span>
                    </div>

                    <p>{comment.text}</p>

                    <button
                        type="button"
                        className="delete-comment"
                        onClick={() =>
                            handleDeleteComment(
                                comment._id
                            )
                        }
                    >
                        🗑 Delete
                    </button>
                </div>
            ))
        )}

    </div>

</div>

<button
    className="close-details"
    onClick={() => {
        setIsClosing(true);
        onClose();
    }}
    disabled={isClosing}
>
    {isClosing ? (
        <>
            <span className="submit-spinner"></span>
            Loading...
        </>
    ) : (
        "← Back to Tasks"
    )}
</button>
        </div>
    );
}

export default TaskDetails;