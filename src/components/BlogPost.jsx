import { useState } from 'react';
import blogPosts from '../data/BlogData';

function BlogPost() {
const [likes, setLikes] = useState({});

return (
<>
{blogPosts.map((post) => ( <article key={post.id}> <h2>{post.title}</h2>

      <p>
        By: {post.author} | {post.date}
      </p>

      <p>{post.content}</p>

      <button
        type="button"
        onClick={() =>
          setLikes({
            ...likes,
            [post.id]: (likes[post.id] || 0) + 1
          })
        }
      >
        ❤️ Like ({likes[post.id] || 0})
      </button>
    </article>
  ))}
</>

);
}

export default BlogPost;
