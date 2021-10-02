import { useEffect, useState } from "react";
import "../styles/Filter.scss";
import "../styles/container.scss";
import greyRocket from "../images/greyRocket.svg";
import greyFire from "../images/greyFire.svg";
import greyWatermelon from "../images/greyWatermelon.svg";
import greyDropdownArrow from "../images/greyDropdownArrow.svg";

const DropFilter = ({ name, dropdown }) => {
  const [dropdownMenu, setDropdownMenu] = useState(true);
  const [itemName, setItemName] = useState(name); 
  const [src, setSrc] = useState(name); 

  useEffect(() => {
    if (src === "best") {
      setSrc(greyRocket)
    } else if (src === "hot") {
      setSrc(greyFire)
    } else {
      setSrc(greyWatermelon)
    }
  }, [])

  const hoverEffect = (e) => {
    console.log(e.currentTarget.className)
  };

  const leaveEffect = (e) => {
    if (e.currentTarget.className === "rocket") {
      e.currentTarget.src = greyRocket;
    } else if (e.currentTarget.className === "dropdown") {
      e.currentTarget.src = greyDropdownArrow;
    }
  };

  const handleClick = (e) => {
    console.log('ok')
  }

  

  return (
    <div className="Filter containerSmall">
      <img
        src={src}
        alt=""
        className={name}
        onMouseMove={hoverEffect}
        onMouseLeave={leaveEffect}
        onClick={handleClick}
      />
      <h4>{name}</h4>
    </div>
  );
};

export default DropFilter;
