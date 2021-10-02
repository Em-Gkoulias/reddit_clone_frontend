import { useState } from "react/cjs/react.development";
// import profileImage from "../images/monster0.svg";
import "../styles/ProfileDetails.scss";

const ProfileDetails = ({ profile, user }) => {
    const url = window.location.href
      .replace("http://localhost:3000", "")
      .split("/")[2];
  const { username, about} = profile;
  const [image, setImage] = useState(
    `http://localhost:5000/uploads/${profile.username}.jpg`
  );
  const [auth, setAuth] = useState(false);

  return (
    <div className="ProfileDetails">
      <div className="header">
        <img src={image} alt="" />
        <div className="headerDetails">
          <h2>{username}</h2>
          <h4>Date</h4>
        </div>
        {username == user.username && (
          <a href={`/profiles/${url}/edit`}>Edit profile</a>
        )}
      </div>
      <div className="aboutMe">
        <h3>About me</h3>
        {about ? <p>{about}</p> : <p>No information yet</p>}
      </div>
    </div>
  );
};

export default ProfileDetails;
