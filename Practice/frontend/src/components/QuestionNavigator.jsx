function QuestionNavigator({
  questions,
  currentQuestion,
  setCurrentQuestion,
}) {
  return (
    <div className="navigator">
      <h3>Questions</h3>

      <div className="nav-grid">
        {questions.map((q, index) => (
          <button
            key={q.id}
            className={
              currentQuestion === index
                ? "nav-btn active"
                : "nav-btn"
            }
            onClick={() =>
              setCurrentQuestion(index)
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionNavigator;