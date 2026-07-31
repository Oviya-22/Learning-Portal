import { useState, useEffect } from "react";
import questions from "../data/questions";
import QuestionNavigator from "../components/QuestionNavigator";
import "../styles/practice.css";

function MCQPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
const [userAnswers, setUserAnswers] = useState([]);
const [showAnswers, setShowAnswers] = useState(false);
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResult(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {

  const updatedAnswers = [...userAnswers];

  updatedAnswers[currentQuestion] =
    selectedAnswer;

  setUserAnswers(updatedAnswers);

  if (
    selectedAnswer ===
    questions[currentQuestion].answer
  ) {
    setScore((prev) => prev + 1);
  }

  setSelectedAnswer("");

  if (
    currentQuestion + 1 <
    questions.length
  ) {
    setCurrentQuestion(
      currentQuestion + 1
    );
  } else {
    setShowResult(true);
  }
};

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  };

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

 if (showResult && !showAnswers) {
  return (
    <div className="container">

      <div className="result-card">

        <h1>Practice Completed 🎉</h1>

        <div className="score">
          {score}/{questions.length}
        </div>

        <h2>
          Accuracy :
          {" "}
          {Math.round(
            (score / questions.length) * 100
          )}
          %
        </h2>

        <br />

        <button
          className="btn"
          onClick={() =>
            setShowAnswers(true)
          }
        >
          View Answers
        </button>

      </div>

    </div>
  );
}
if (showAnswers) {
  return (
    <div className="container">

      <h1>Answer Review</h1>

      {questions.map((q, index) => (

        <div
          key={q.id}
          className="review-card"
        >

          <h3>
            Question {index + 1}
          </h3>

          <p>{q.question}</p>

          <br />

          <p>
            <strong>
              Your Answer:
            </strong>
            {" "}
            {userAnswers[index]}
          </p>

          <p>
            <strong>
              Correct Answer:
            </strong>
            {" "}
            {q.answer}
          </p>

        </div>

      ))}

    </div>
  );
}

  return (
    <div className="container">

      <div className="topbar">

        <h1>Practice Portal</h1>

        <div className="timer">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60)
            .toString()
            .padStart(2, "0")}
        </div>

      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="portal-layout">

        <QuestionNavigator
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={
            setCurrentQuestion
          }
        />

        <div className="question-card">

          <h3>
            Question {currentQuestion + 1}
            {" "}of{" "}
            {questions.length}
          </h3>

          <h2 className="question">
            {
              questions[currentQuestion]
                .question
            }
          </h2>

          {questions[
            currentQuestion
          ].options.map((option) => (
            <label
              key={option}
              className="option"
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={
                  selectedAnswer === option
                }
                onChange={(e) =>
                  setSelectedAnswer(
                    e.target.value
                  )
                }
              />

              {option}
            </label>
          ))}

          <div className="button-group">

            <button
              className="secondary-btn"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0
              }
            >
              Previous
            </button>

            <button
              className="btn"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentQuestion ===
              questions.length - 1
                ? "Finish Test"
                : "Next"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MCQPractice;