import { useState } from "react";

function QuestionCard({ question }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState("");

  const checkAnswer = () => {
    if (selectedAnswer === question.answer) {
      setResult("Correct Answer ✅");
    } else {
      setResult(
        `Wrong Answer ❌ | Correct Answer: ${question.answer}`
      );
    }
  };

  return (
    <div>
      <h2>{question.question}</h2>

      {question.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name="answer"
            value={option}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />

          <label>{option}</label>
        </div>
      ))}

      <br />

      <button onClick={checkAnswer}>
        Submit
      </button>

      <h3>{result}</h3>
    </div>
  );
}

export default QuestionCard;