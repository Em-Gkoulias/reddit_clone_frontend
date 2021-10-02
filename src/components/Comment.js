import "../styles/Comment.scss";
import profileIcon from "../images/monster.svg";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { Link } from "react-router-dom";

const Comment = ({ userId, text }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        // setImage();
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="Comment container">
      <div className="commentHeader">
        <img
          className="profileIcon"
          src={`http://localhost:5000/uploads/${user.username}.jpg`}
          alt=""
        />
        <Link to={`/profiles/${user.id}`}>
          <b>{user.username}</b>
        </Link>
        <p>3 hours</p>
      </div>
      <p className="commentBody">{text}</p>
    </div>
  );
};

export default Comment;
