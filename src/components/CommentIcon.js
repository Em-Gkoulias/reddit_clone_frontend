import "../styles/CommentIcon.scss";
import greyBubble from "../images/greyBubble.svg";
import orangeBubble from "../images/orangeBubble.svg";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";

const CommentIcon = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/post/${postId}`)
      .then((res) => {
        setComments(res.data.length)
        setIsLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  const hoverEffect = (e) => {
    if (e.currentTarget.className === "bubble") {
      e.currentTarget.src = orangeBubble;
    }
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "bubble") {
      e.currentTarget.src = greyBubble;
    }
  };

  return (
    <div className="CommentIcon containerSmall">
      <img
        src={greyBubble}
        alt=""
        className="bubble"
        onMouseOver={hoverEffect}
        onMouseLeave={leaveEffect}
      />
      <p>{comments} Comments</p>
    </div>
  );
};

export default CommentIcon;
