import { useState } from "react";
import "../styles/Filter.scss";
import "../styles/container.scss";
import greyFire from "../images/greyFire.svg";
import orangeFire from "../images/orangeFire.svg";
import greyDropdownArrow from "../images/greyDropdownArrow.svg";
import orangeDropdownArrow from "../images/orangeDropdownArrow.svg";

const HotFilter = ({ active, dropdown }) => {
  const [dropMenu, setDropMenu] = useState(true);
  const hoverEffect = (e) => {
    if (e.currentTarget.className === "fire") {
      e.currentTarget.src = orangeFire;
    } else if (e.currentTarget.className === "dropdownArrow") {
      e.currentTarget.src = orangeDropdownArrow;
    }
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "fire") {
      e.currentTarget.src = greyFire;
    } else if (e.currentTarget.className === "dropdownArrow") {
      e.currentTarget.src = greyDropdownArrow;
    }
  };

  const handleClickFilter = (e) => {
    window.location.href = "http://localhost:3000/hot";
  };

  const handleClickDropdown = (e) => {
    if (dropMenu) {
      setDropMenu(false);
    } else {
      setDropMenu(true);
    }
    return dropdown(dropMenu);
  };

  return (
    <div className="Filter containerSmall">
      {active ? (
        <img
          src={orangeFire}
          alt=""
          className="fire"
        />
      ) : (
        <img
          src={greyFire}
          alt=""
          className="fire"
          onMouseMove={hoverEffect}
          onMouseLeave={leaveEffect}
          onClick={handleClickFilter}
        />
      )}
      <h4>Hot</h4>
      {active && (
        <img
          src={greyDropdownArrow}
          alt=""
          className="dropdownArrow"
          onMouseMove={hoverEffect}
          onMouseLeave={leaveEffect}
          onClick={handleClickDropdown}
        />
      )}
    </div>
  );
};

export default HotFilter;
