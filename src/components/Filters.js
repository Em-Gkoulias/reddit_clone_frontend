import { useState } from "react";

import BestFilter from "./BestFilter";
import HotFilter from "./HotFilter";
import FreshFilter from "./FreshFilter";

import "../styles/Filters.scss";
import "../styles/container.scss";

const Filters = ({ url }) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  if (url === "") {
    return (
      <div className="Filters container">
        <BestFilter
          active={true}
          dropdown={(dropdownMenu) => setDropdownMenu(dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="dropdown">
            <HotFilter />
            <FreshFilter />
          </div>
        )}
      </div>
    );
  } else if (url === "hot") {
    return (
      <div className="Filters container">
        <HotFilter
          active={true}
          dropdown={(dropdownMenu) => setDropdownMenu(dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="dropdown">
            <BestFilter />
            <FreshFilter />
          </div>
        )}
      </div>
    );
  } else if (url === "fresh") {
    return (
      <div className="Filters container">
        <FreshFilter
          active={true}
          dropdown={(dropdownMenu) => setDropdownMenu(dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="dropdown">
            <BestFilter />
            <HotFilter />
          </div>
        )}
      </div>
    );
  }
};

export default Filters;
