import React, { useState } from "react";
import SelectUnit from "./SelectUnit";
/* import "./Convert.css"; */

function Convert({ unitsObj }) {
  const [distance, setDistance] = useState("");
  const [unit, setUnit] = useState("cm");
  const [convertTo, setConvertTo] = useState("cm");
  const [converted, setConverted] = useState("");

  const units = Object.keys(unitsObj);

  const handleInputChange = (e) => {
    setDistance(e.target.value);
  };

  const handleUnitSelect = (e) => {
    setUnit(e.target.value);
  };

  const handleConvertToSelect = (e) => {
    setConvertTo(e.target.value);
  };

  const convertDistance = () => {
    if (!distance) {
      alert("Please enter a valid number for distance.");
      return;
    }
    const convertedDistance = calculateConvertedDistance();
    setConverted(convertedDistance);
  };

  const calculateConvertedDistance = () => {
    return (distance * unitsObj[unit]) / unitsObj[convertTo];
  };

  return (
    <>
      <div className="input">
        <label htmlFor="distance">Distance:</label>
        <input
          type="number"
          id="distance"
          onChange={handleInputChange}
          placeholder="Enter distance"
        />
        <SelectUnit id="inputUnit" units={units} onChange={handleUnitSelect} />
      </div>
      <div className="convertTo">
        <label htmlFor="outputUnit">Convert to:</label>
        <SelectUnit
          id="outputUnit"
          units={units}
          onChange={handleConvertToSelect}
        />
      </div>
      <div className="output">
        <label htmlFor="convertedDistance">Converted Distance:</label>
        <span id="convertedDistance">{converted ? `${converted} ${convertTo}` : ""}</span>
      </div>
      <button onClick={convertDistance}>Convert</button>
    </>
  );
}

export default Convert;
