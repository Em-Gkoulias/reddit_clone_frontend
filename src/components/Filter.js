import { useState} from "react";
import "../styles/Filter.scss";
import "../styles/container.scss";
import greyRocket from "../images/greyRocket.svg";
import orangeRocket from "../images/orangeRocket.svg";
import greyDropdownArrow from "../images/greyDropdownArrow.svg";
import orangeDropdownArrow from "../images/orangeDropdownArrow.svg";

const Filter = ({ active, dropdown }) => {
  const [isActive, setIsActive] = useState(active);

  const [dropdownMenu, setDropdownMenu] = useState(true);

  const hoverEffect = (e) => {
    if (e.currentTarget.className === "rocket") {
      e.currentTarget.src = orangeRocket;
    } else if (e.currentTarget.className === "dropdown") {
      e.currentTarget.src = orangeDropdownArrow;
    }
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "rocket") {
      e.currentTarget.src = greyRocket;
    } else if (e.currentTarget.className === "dropdown") {
      e.currentTarget.src = greyDropdownArrow;
    }
  };

  const dropdownEffect = (e) => {
    if (dropdownMenu === false) {
      setDropdownMenu(true);
    } else {
      setDropdownMenu(false);
    }
    dropdown(dropdownMenu);
  };

  return (
    <div className="Filter containerSmall">
      <img
        src={greyRocket}
        alt=""
        className="rocket"
        onMouseMove={hoverEffect}
        onMouseLeave={leaveEffect}
      />
      <h5>Best</h5>
      {isActive && (
        <img
          src={greyDropdownArrow}
          alt=""
          className="dropdown"
          onMouseMove={hoverEffect}
          onMouseLeave={leaveEffect}
          onClick={dropdownEffect}
        />
      )}
    </div>
  );
};

export default Filter;
