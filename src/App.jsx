import React, { useState } from 'react';
import { questions } from './assets/questions';
import Question from './components/Question';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [path, setPath] = useState([]);

  const handleAnswer = (selectedOption) => {
    const answerIndex = parseInt(selectedOption);
    const currentQuestion = questions[currentQuestionIndex];
    const newPath = [...path, { [currentQuestion.question]: currentQuestion.answers[answerIndex].option }];
    const nextQuestionIndex = currentQuestion.answers[answerIndex]?.next_question;
    setPath(newPath);
    if (nextQuestionIndex) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setCurrentQuestionIndex(null);
      console.log(JSON.stringify(newPath, null, 2));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedOption = e.target.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
      handleAnswer(selectedOption.value);
      e.target.reset();
    } else {
      alert("Please select an option.");
    }
  };

  return (
    <div className="container" id="main">
      {currentQuestionIndex ? (
        <Question
          question={questions[currentQuestionIndex].question}
          answers={questions[currentQuestionIndex].answers}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <div>
          <h2>Thx a lot!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
