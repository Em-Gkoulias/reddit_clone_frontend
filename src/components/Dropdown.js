import { useState } from "react";
import "../styles/Dropdown.scss";
import "../styles/Filter.scss";
import "../styles/container.scss";
import DropFilter from "./DropFilter";

const Dropdown = ({filterProp, filtersProp}) => {
  console.log(filtersProp)
  const [filter, setFilter] = useState(filterProp);
  const [filters, setFilters] = useState(filtersProp);

  return (
    <div className="Dropdown">
      {filters.map(name => {
        return <DropFilter name={name} />
      })}
    </div>
  );
};

export default Dropdown;
