import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import "../styles/Comments.scss";
import Comment from "./Comment";

const Comments = ({ post, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsSum, setCommentsSum] = useState(parseInt(post.comments_sum));
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/post/${post.id}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .all([
        axios.post(
          `http://localhost:5000/comments/post/${post.id}/user/${user.id}`,
          {
            text,
          }
        ),
        axios.patch(`http://localhost:5000/posts/${post.id}/comments`, {
          commentsSum: commentsSum + 1,
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1.data, res2.data);
          setCommentsSum(commentsSum + 1);
          axios
            .get(`http://localhost:5000/comments/post/${post.id}`)
            .then((res) => {
              console.log(res.data);
              setComments(res.data)
            })
            .catch((err) => console.log(err));
        })
      )
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="Comments">
      <form>
        <textarea
          name="comment"
          id="comment"
          rows="10"
          placeholder="What are your thoughts?"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
      {/* <h5>Sort by: Best</h5> */}
      {comments.map((comment) => {
        return <Comment userId={comment.person_id} text={comment.text} />;
      })}
    </div>
  );
};

export default Comments;
