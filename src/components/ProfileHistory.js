import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import "../styles/ProfileHistory.scss";
import Post from "./Post";
import Comment from "./Comment";

const ProfileHistory = ({ profile }) => {
  const [category, setCategory] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .all([
        axios.get(`http://localhost:5000/posts/user/${profile.id}`),
        axios.get(`http://localhost:5000/comments/user/${profile.id}`),
      ])
      .then(
        axios.spread((res1, res2) => {
          setPosts(res1.data);
          setComments(res2.data);
          setIsLoading(false);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const postsClicked = (e) => {
    e.preventDefault();
    if (category === "comments") {
      setCategory("posts");
    }
  };

  const commentsClicked = (e) => {
    e.preventDefault();
    if (category === "posts") {
      setCategory("comments");
    }
  };

  const handleClick = (postId) => {
    window.location.href = `http://localhost:3000/comments/${postId}`;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="ProfileHistory">
      <div className="categories">
        <div className="buttons">
          {category === "posts" ? (
            <button className="active" onClick={postsClicked}>
              <h4>Posts by user</h4>
            </button>
          ) : (
            <button className="inActive" onClick={postsClicked}>
              <h4>Posts by user</h4>
            </button>
          )}
          {category === "comments" ? (
            <button className="active" onClick={commentsClicked}>
              <h4>Comments by user</h4>
            </button>
          ) : (
            <button className="inActive" onClick={commentsClicked}>
              <h4>Comments by user</h4>
            </button>
          )}
        </div>
        <div className="container">
          {category === "posts"
            ? posts.map((post) => {
                return (
                  <div className="historyListItem">
                    <Post post={post} />
                  </div>
                );
              })
            : comments.map((comment) => {
                return (
                  <div
                    className="historyListItem commentListItem"
                    onClick={(e) => handleClick(comment.post_id)}
                  >
                    <Comment userId={profile.id} text={comment.text} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ProfileHistory;
