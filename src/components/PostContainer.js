import "../styles/PostContainer.scss";
import "../styles/container.scss";
import Votes from "./Votes";
import Post from "./Post";
import CommentIcon from "./CommentIcon";

const PostContainer = ({ post, user }) => {
  return (
    <div className="PostContainer container">
      <Post post={post} />
      <div className="details">
        <Votes post={post} user={user} />
        <CommentIcon postId={post.id} />
      </div>
    </div>
  );
};

export default PostContainer;
