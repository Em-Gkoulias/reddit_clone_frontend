import "../styles/CreatePost.scss";
import "../styles/container.scss";
import monster2 from "../images/monster0.svg";

const CreatePost = () => {
  const handleClick = (e) => {
    window.location.href = "http://localhost:3000/create-post";
  }
  return (
    <div className="CreatePost container">
      <img src={monster2} alt="" />
      <input type="text" placeholder="Create Post" onClick={handleClick} />
    </div>
  )
}

export default CreatePost;