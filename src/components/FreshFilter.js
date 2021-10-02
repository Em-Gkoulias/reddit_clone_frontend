import { useState } from "react";
import "../styles/Filter.scss";
import "../styles/container.scss";
import greyWatermelon from "../images/greyWatermelon.svg";
import orangeWatermelon from "../images/orangeWatermelon.svg";
import greyDropdownArrow from "../images/greyDropdownArrow.svg";
import orangeDropdownArrow from "../images/orangeDropdownArrow.svg";

const FreshFilter = ({ active, dropdown }) => {
  const [dropMenu, setDropMenu] = useState(true);
  const hoverEffect = (e) => {
    if (e.currentTarget.className === "watermelon") {
      e.currentTarget.src = orangeWatermelon;
    } else if (e.currentTarget.className === "dropdownArrow") {
      e.currentTarget.src = orangeDropdownArrow;
    }
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "watermelon") {
      e.currentTarget.src = greyWatermelon;
    } else if (e.currentTarget.className === "dropdownArrow") {
      e.currentTarget.src = greyDropdownArrow;
    }
  };

  const handleClickFilter = (e) => {
    window.location.href = "http://localhost:3000/fresh";
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
          src={orangeWatermelon}
          alt=""
          className="watermelon"
        />
      ) : (
        <img
          src={greyWatermelon}
          alt=""
          className="watermelon"
          onMouseMove={hoverEffect}
          onMouseLeave={leaveEffect}
          onClick={handleClickFilter}
        />
      )}
      <h4>Fresh</h4>
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

export default FreshFilter;
