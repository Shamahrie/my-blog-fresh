
import { useState, useEffect } from "react";
import { Link } from "react-router";

function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts.");
        }

        return response.json();
      })
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Unable to load blog posts. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading blog posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="blog-posts-page">
      <h1>My Blog Posts</h1>

      {blogPosts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 100)}...</p>

          <Link to={`/post/${post.id}`}>
            Read More
          </Link>
        </article>
      ))}
    </div>
  );
}

export default BlogPostsPage;
