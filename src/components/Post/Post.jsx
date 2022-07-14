import { AiOutlineClose } from "react-icons/ai";
import "./Post.css";

function Post({ post, handleRemove }) {
  
  const removePost = (id)=>{
      handleRemove(id);
  }

  return (
    <section className="post__container">
      {post.length > 0 ? (
        post.map((post) => {
          return (
            <div
              key={`post_${post.id}`}
              className={`post__card ${post.check ? "important" : ""}`}
            >
              <button className="post__icon" onClick={() => removePost(post.id)}>
                <AiOutlineClose />
              </button>
              <h2>{post.title}</h2>
              <p className="post__description">{post.description}</p>
            </div>
          );
        })
      ) : (
        <p>Agrega un nuevo post</p>
      )}
    </section>
  );
}

export default Post;
