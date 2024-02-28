import React, { useState } from "react";
import "./App.css";
import "./components/SelectUnit";
import Convert from "./components/Convert";

function App() {
  const [unitsObj, setUnitsObj] = useState({
    cm: 1,
    m: 100,
    in: 2.54,
    ft: 30.48,
  });
  const [newUnit, setNewUnit] = useState("");
  const [conversionFactor, setConversionFactor] = useState("");

  const addNewRule = () => {
    if (!newUnit || !isNaN(newUnit) || !conversionFactor) {
      alert("Please enter a valid unit and conversion factor.");
    }
    if (unitsObj[newUnit]) {
      alert("Unit already exists.");
    } else {
      const newObj = { ...unitsObj, [newUnit]: +conversionFactor };
      setUnitsObj(newObj);
      setNewUnit("");
      setConversionFactor("");
    }
  };

  return (
    <div className="converter">
      <h2>Distance Converter</h2>
      <Convert unitsObj={unitsObj} />
      <div className="additional-rule">
        <label htmlFor="newUnit">Add new unit:</label>
        <input
          type="text"
          id="newUnit"
          placeholder="New unit"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
        />
        <input
          type="number"
          id="conversionFactor"
          placeholder="Unit in cm"
          value={conversionFactor}
          onChange={(e) => setConversionFactor(e.target.value)}
        />
        <button onClick={addNewRule}>Add</button>
      </div>
    </div>
  );
}

export default App;
