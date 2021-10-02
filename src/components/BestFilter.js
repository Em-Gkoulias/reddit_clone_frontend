import { useEffect, useState } from "react";
import "../styles/Filter.scss";
import "../styles/container.scss";
import greyRocket from "../images/greyRocket.svg";
import orangeRocket from "../images/orangeRocket.svg";
import greyDropdownArrow from "../images/greyDropdownArrow.svg";
import orangeDropdownArrow from "../images/orangeDropdownArrow.svg";

const BestFilter = ({ active, dropdown }) => {
  const [dropMenu, setDropMenu] = useState(true);

  const hoverEffect = (e) => {
    if ((e.currentTarget.className === "rocket")) {
      e.currentTarget.src = orangeRocket;
    } else if ((e.currentTarget.className === "dropdownArrow")) {
      e.currentTarget.src = orangeDropdownArrow;
    }
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "rocket") {
      e.currentTarget.src = greyRocket;
    } else if (e.currentTarget.className === "dropdownArrow") {
      e.currentTarget.src = greyDropdownArrow;
    }
  };

  const handleClickFilter = (e) => {
    window.location.href = "http://localhost:3000/";
  };

  const handleClickDropdown = (e) => {
    if (dropMenu) {
      setDropMenu(false);
    } else {
      setDropMenu(true);
    }
    return dropdown(dropMenu)
  };

  

  return (
    <div className="Filter containerSmall">
      {active ? (
        <img
          src={orangeRocket}
          alt=""
          className="rocket"
        />
      ) : (
        <img
          src={greyRocket}
          alt=""
          className="rocket"
          onMouseMove={hoverEffect}
          onMouseLeave={leaveEffect}
          onClick={handleClickFilter}
        />
      )}
      <h4>Best</h4>
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

export default BestFilter;
