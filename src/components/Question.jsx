import React from "react";
import Option from "./Option";
import './Question.css';

function Question({ question, answers, onSubmit }) {
  return (
    <>
      <h2>{question}</h2>
      <form onSubmit={onSubmit}>
        <div id="options">
          {answers.map((answer, idx) => (
            <Option id={idx} option={answer.option} />
          ))}
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Question;
