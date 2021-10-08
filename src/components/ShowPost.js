import "../styles/ShowPost.scss";
import PostContainer from "./PostContainer";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import axios from "axios";

const ShowPost = ({ user }) => {
  const postId = window.location.href.split("/")[4];
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/comments/${postId}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="ShowPost container">
        <PostContainer className="PostContainer" post={post} user={user} />
        <p className="commentAs">Comment as user</p>
        <Comments post={post} user={user} />
      </div>
    );
  }
};

export default ShowPost;
