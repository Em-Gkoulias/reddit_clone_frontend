import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import "../styles/EditProfile.scss";
import defaultImage from "../images/monster0.svg"

const EditProfile = ({ user }) => {
  const url = window.location.href
    .replace("http://localhost:3000", "")
    .split("/")[2];

  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState();
  const [imageName, setImageName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${url}`)
      .then((res) => {
        console.log(res.data);
        setImageName(res.data.image);
        setAbout(res.data.about);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", user.username)
    data.append("file", file)
    axios
      .all([
        axios.post("http://localhost:5000/users/images", data),
        axios.patch(`http://localhost:5000/users/${url}`, {
          imageName: `${user.username}.jpg`,
          about,
        }),
      ])
      .then(axios.spread((res1, res2) => {
        console.log(res1.data, res2.data)
      }))
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (user.id != url) {
    return <div>NO AUTHORIZATION</div>;
  }

  return (
    <div className="EditProfile container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="header">
          <h2>Choose an image for your profile</h2>
          <div className="imageUpload">
            {console.log(imageName)}
            {imageName ? (
              <img
                src={`http://localhost:5000/uploads/${user.username}.jpg`}
                alt=""
              />
            ) : (
              <img
                src={defaultImage}
                alt=""
              />
            )}
            {/* <img
              src={`http://localhost:5000/uploads/${user.username}.jpg`}
              alt=""
            /> */}
            <input
              type="file"
              name="image"
              accept=".jpg"
              multiple={false}
              onChange={imageHandler}
            />
          </div>
        </div>

        <h3>Tell us something about you</h3>
        <textarea
          name="text"
          id="text"
          rows="5"
          placeholder="Text (optional)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default EditProfile;
