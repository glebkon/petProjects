import React from 'react';
import './Option.css';

function Option({ id, option }) {
  return (
    <div className="option">
      <input type="radio" name="answer" value={id} id={`option${id}`} />
      <label htmlFor={`option${id}`}>{option}</label>
    </div>
  );
}

export default Option;
