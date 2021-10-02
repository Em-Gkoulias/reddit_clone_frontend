import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import "../styles/container.scss";
import monster from "../images/monster1.svg";
import menu from "../images/menu.svg";
import axios from "axios";

const Navbar = ({userId}) => {
  const [navbarMenu, setNavbarMenu] = useState(false);

  const handleClickLogo = (e) => {
    window.location.href = "http://localhost:3000/";
  };

  const handleClickMenu = (e) => {
    if (navbarMenu) {
      setNavbarMenu(false);
    } else {
      setNavbarMenu(true);
    }
  };

  const clickLogout = (e) => {
    e.preventDefault();
    setNavbarMenu(false);
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Navbar navbarContainer">
      <div className="leftNav">
        <img
          src={monster}
          alt="logo icon"
          className="navbarItem"
          onClick={handleClickLogo}
        />
        <h1 className="navbarItem">bohhy</h1>
      </div>
      {document.cookie && (
        <div className="rightNav">
          <img
            src={menu}
            alt=""
            className="menuIcon"
            onClick={handleClickMenu}
          />
          {navbarMenu && (
            <div className="navbarMenu">
              <Link
                to={`/profiles/${userId}`}
                className="menuItem"
                onClick={(e) => setNavbarMenu(false)}
              >
                Profile
              </Link>
              <Link
                to="/about"
                className="menuItem"
                onClick={(e) => setNavbarMenu(false)}
              >
                About
              </Link>
              <button className="menuItem" onClick={clickLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
