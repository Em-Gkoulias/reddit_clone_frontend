import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import "../styles/Profile.scss";
import Post from "./Post";
import ProfileDetails from "./ProfileDetails";
import ProfileHistory from "./ProfileHistory";

const Profile = ({user}) => {
  const profileId = window.location.href.split("/")[4];
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${profileId}`)
      .then((res) => {
        setProfile(res.data)
        console.log(res.data)
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="Profile container">
      <ProfileDetails profile={profile} user={user} />
      <ProfileHistory profile={profile} />
    </div>
  );
};

export default Profile;
