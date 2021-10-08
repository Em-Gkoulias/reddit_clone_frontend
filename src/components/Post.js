import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import "../styles/Post.scss";

const Post = ({ post }) => {
  const url = window.location.href;
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${post.person_id}`)
      .then((res) => {
        setIsLoading(false);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

  const handleClick = (e) => {
    window.location.href = `http://localhost:3000/comments/${post.id}`;
  };

  if (isLoading) {
    return <div>Is Loading...</div>;
  } else {
    if (
      url === "http://localhost:3000/" ||
      url === "http://localhost:3000/hot" ||
      "http://localhost:3000/fresh"
    ) {
      return (
        <div className="Post postList">
          <div className="postHeader">
            <p>
              Posted by{" "}
              <Link to={`/profiles/${user.id}`}>
                <b>{user.username}</b>
              </Link>{" "}
              - 4 hours ago
            </p>
            {url !== `http://localhost:3000/comments/${post.id}` && (
              <a className="postLink" onClick={handleClick}>
                See post
              </a>
            )}
            {/* <a className="postLink" onClick={handleClick}>
              see post
            </a> */}
          </div>
          <h4>{post.title}</h4>
          <p className="paragraph">{post.text}</p>
        </div>
      );
    } else {
      return (
        <div className="Post">
          <p>
            Posted by <b>{user.username}</b> - 4 hours ago
          </p>
          <h4>{post.title}</h4>
          <p className="paragraph">{post.text}</p>
        </div>
      );
    }
  }
};

export default Post;
