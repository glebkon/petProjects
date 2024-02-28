import React from "react";
/* import "./SelectUnit.css"; */

function SelectUnit({ id, units, onChange}) {
  return (
    <select className="units" id={id} onChange={onChange}>
      {units.map((unit) => (
        <option key={unit} value={unit}>{unit}</option>
      ))}
    </select>
  );
}

export default SelectUnit;
