import "../styles/Main.scss";
import "../styles/container.scss";
import Filters from "./Filters";
import PostContainer from "./PostContainer";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const Main = ({ url, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(url);

  useEffect(() => {
    if (url == "") {
      setFilter("best");
      axios
        .get(`http://localhost:5000/posts/best`)
        .then((res) => {
          setPosts(res.data.rows);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:5000/posts/${filter}`)
        .then((res) => {
          setPosts(res.data.rows);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="Main mainContainer">
      <Filters url={url} />
      {posts.map((post) => {
        return <PostContainer post={post} user={user} />;
      })}
    </div>
  );
};

export default Main;
