import "../styles/Votes.scss";
import arrowDown from "../images/downArrow.svg";
import arrowUp from "../images/upArrow.svg";
import orangeArrow from "../images/orangeArrow.svg";
import blueArrow from "../images/blueArrow.svg";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";

const Votes = ({ post, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [votesSum, setVotesSum] = useState(parseInt(post.votes_sum));
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  useEffect(() => {
    // fetch all votes for this post
    axios
      .get(`http://localhost:5000/votes/post/${post.id}/${user.id}`)
      .then((res) => {
        setIsUpvoted(res.data.isUpvoted);
        setIsDownvoted(res.data.isDownvoted);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const hoverEffect = (e) => {
    if (e.currentTarget.className === "arrowUp") {
      if (!isUpvoted) {
        e.currentTarget.src = orangeArrow;
      }
    } else {
      if (!isDownvoted) {
        e.currentTarget.src = blueArrow;
      }
    }
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "arrowUp") {
      if (!isUpvoted) {
        e.currentTarget.src = arrowUp;
      }
    } else {
      if (!isDownvoted) {
        e.currentTarget.src = arrowDown;
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (e.currentTarget.className == "arrowUp") {
      // this is for arrowup
      // check is its already upvoted
      if (isUpvoted) {
        // since it is, delete the old vote and then change the votesSum of the post
        axios
          .all([
            axios.delete(
              `http://localhost:5000/votes/post/${post.id}/${user.id}`
            ),
            axios.patch(`http://localhost:5000/posts/${post.id}/votes`, {
              votesSum: votesSum - 1,
            }),
          ])
          .then(
            axios.spread((res1, res2) => {
              setIsUpvoted(false);
              setVotesSum(votesSum - 1);
            })
          )
          .catch((err) => console.log(err));
      } else {
        // since its not upvoted, check if its already downvoted
        if (isDownvoted) {
          // since it is, delete the old vote, then create a new vote and then change the votesSum
          axios
            .all([
              axios.delete(
                `http://localhost:5000/votes/post/${post.id}/${user.id}`
              ),
              axios.post(`http://localhost:5000/votes/post/${post.id}`, {
                value: "up",
                personId: user.id,
                postId: post.id,
              }),
              axios.patch(`http://localhost:5000/posts/${post.id}/votes`, {
                votesSum: votesSum + 2,
              }),
            ])
            .then((res1, res2, res3) => {
              setIsDownvoted(false);
              setIsUpvoted(true);
              setVotesSum(votesSum + 2);
            })
            .catch((err) => console.log(err));
        } else {
          // since its not voted at all, create a new vote and then change the votesSum
          axios
            .all([
              axios.post(`http://localhost:5000/votes/post/${post.id}`, {
                value: "up",
                personId: user.id,
                postId: post.id,
              }),
              axios.patch(`http://localhost:5000/posts/${post.id}/votes`, {
                votesSum: votesSum + 1,
              }),
            ])
            .then(
              axios.spread((res1, res2) => {
                setIsUpvoted(true);
                setVotesSum(votesSum + 1);
              })
            )
            .catch((err) => console.log(err));
        }
      }
    } else {
      // this is for arrowdown
      if (isDownvoted) {
        // since it is, delete the old vote and then change the votesSum of the post
        axios
          .all([
            axios.delete(
              `http://localhost:5000/votes/post/${post.id}/${user.id}`
            ),
            axios.patch(`http://localhost:5000/posts/${post.id}/votes`, {
              votesSum: votesSum + 1,
            }),
          ])
          .then(
            axios.spread((res1, res2) => {
              setIsDownvoted(false);
              setVotesSum(votesSum + 1);
            })
          )
          .catch((err) => console.log(err));
      } else {
        // since its not upvoted, check if its already downvoted
        if (isUpvoted) {
          // since it is, delete the old vote, then create a new vote and then change the votesSum
          axios
            .all([
              axios.delete(
                `http://localhost:5000/votes/post/${post.id}/${user.id}`
              ),
              axios.post(`http://localhost:5000/votes/post/${post.id}`, {
                value: "down",
                personId: user.id,
                postId: post.id,
              }),
              axios.patch(`http://localhost:5000/posts/${post.id}/votes`, {
                votesSum: votesSum - 2,
              }),
            ])
            .then((res1, res2, res3) => {
              setIsUpvoted(false);
              setIsDownvoted(true);
              setVotesSum(votesSum - 2);
            })
            .catch((err) => console.log(err));
        } else {
          // since its not voted at all, create a new vote and then change the votesSum
          axios
            .all([
              axios.post(`http://localhost:5000/votes/post/${post.id}`, {
                value: "down",
                personId: user.id,
                postId: post.id,
              }),
              axios.patch(`http://localhost:5000/posts/${post.id}/votes`, {
                votesSum: votesSum - 1,
              }),
            ])
            .then(
              axios.spread((res1, res2) => {
                setIsDownvoted(true);
                setVotesSum(votesSum - 1);
              })
            )
            .catch((err) => console.log(err));
        }
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Votes containerSmall">
      <img
        src={isUpvoted ? orangeArrow : arrowUp}
        className="arrowUp"
        alt=""
        onMouseEnter={hoverEffect}
        onMouseLeave={leaveEffect}
        onClick={handleClick}
      />
      <h4>{votesSum}</h4>
      <img
        src={isDownvoted ? blueArrow : arrowDown}
        className="arrowDown"
        alt=""
        onMouseEnter={hoverEffect}
        onMouseLeave={leaveEffect}
        onClick={handleClick}
      />
    </div>
  );
};

export default Votes;
