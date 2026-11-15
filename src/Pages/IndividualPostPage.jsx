
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import CommentSection from "../components/CommentSection";

function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError("");
      setComments([]);
      setPost(null);
      setAuthor(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }

        const postData = await response.json();

        if (!postData.id) {
          setPost(null);
          return;
        }

        setPost(postData);

        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch author.");
        }

        const userData = await userResponse.json();
        setAuthor(userData);

        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments.");
        }

        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Unable to load this blog post. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleAddComment(newComment) {
    setSubmitting(true);
    setCommentError("");

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newComment.name,
            body: newComment.body,
            postId: Number(id),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment.");
      }

      const savedComment = await response.json();

      setComments((previousComments) => [
        ...previousComments,
        {
          ...savedComment,
          id: savedComment.id ?? Date.now(),
          name: newComment.name,
          body: newComment.body,
        },
      ]);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setCommentError("Unable to submit your comment. Please try again.");
      throw error;
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p>Loading blog post...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to Blog Posts</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <h1>Post Not Found</h1>
        <Link to="/">Back to Blog Posts</Link>
      </div>
    );
  }

  return (
    <div className="individual-post-page">
      <article>
        <h1>{post.title}</h1>

        {author && (
          <div>
            <p>By: {author.name}</p>
            <p>Email: {author.email}</p>
          </div>
        )}

        <p>{post.body}</p>
      </article>

      <CommentSection
        comments={comments}
        onAddComment={handleAddComment}
        submitting={submitting}
        commentError={commentError}
      />

      <Link to="/">Back to Blog Posts</Link>
    </div>
  );
}

export default IndividualPostPage;
