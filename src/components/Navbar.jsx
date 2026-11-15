
import { Link } from "react-router";
import { useContext } from "react";
import blogPosts from "../data/BlogData";
import { ThemeContext } from "../tempContext/ThemeContext.js";
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <Link to="/">Blog Posts</Link>

      {blogPosts.length > 0 && (
        <Link to={`/post/${blogPosts[0].id}`}>
          Individual Post
        </Link>
      )}

      <Link to="/contact">Contact</Link>

      <button type="button" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
}

export default Navbar;
