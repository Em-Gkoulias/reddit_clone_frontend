import axios from "axios";
import { useState } from "react";
import "../styles/CreatePostForm.scss"

const CreatePostForm = ({user}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/posts", {
      title,
      text,
      person_id: parseInt(user.id)
    }).then((res) => {
      if (res.data.msg) {
        setError(res.data.msg)
        return;
      }
      window.location.href = "http://localhost:3000/";
    }).catch(err => console.log(err))
  }

  return (
    <div className="CreatePostForm">
      <h2>Create a post</h2>
      <form className="container">
        <textarea
          name="title"
          id="title"
          rows="1"
          placeholder="Title"
          maxLength="300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></textarea>
        <textarea
          name="text"
          id="text"
          rows="5"
          placeholder="Text (optional)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
        {error !== "" && (
          <p className="error">
            <b>Error: </b>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default CreatePostForm