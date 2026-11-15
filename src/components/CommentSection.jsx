
import { useState } from "react";

function CommentSection({
  comments,
  onAddComment,
  submitting = false,
  commentError = "",
}) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || comment.trim() === "") {
      setValidationError("Please enter your name and comment.");
      return;
    }

    setValidationError("");

    try {
      await onAddComment({
        name: name.trim(),
        body: comment.trim(),
      });

      setName("");
      setComment("");
    } catch {
      // Keep the form values so the user can try again.
    }
  }

  return (
    <section className="comment-section">
      <h2>Leave a Comment</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="commenter-name">Name:</label>
        <input
          id="commenter-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="comment-text">Comment:</label>
        <textarea
          id="comment-text"
          rows="4"
          placeholder="Write a comment..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        />

        {validationError && (
          <p role="alert">{validationError}</p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>

      {commentError && <p role="alert">{commentError}</p>}

      <h3>Comments</h3>

      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((item) => (
          <div
            key={item.id ?? `${item.name}-${item.body}`}
            className="comment"
          >
            <strong>{item.name}</strong>
            <p>{item.body ?? item.text}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default CommentSection;
