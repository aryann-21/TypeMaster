import React from "react";

const TypingArea = ({
  typingText,
  userInput,
  timeLeft,
  mistakes,
  resetGame,
  gameOver
}) => {
  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const correctWords = countWords(
    typingText.slice(0, userInput.length).split("").filter((char, index) => char === userInput[index]).join("")
  );

  const correctChars = userInput.split("").filter((char, index) => typingText[index] === char).length;

  const elapsedTime = (60 - timeLeft) / 60;

  const WPM = elapsedTime > 0 ? (correctWords / elapsedTime) : 0;
  const CPM = elapsedTime > 0 ? (correctChars / elapsedTime) : 0;

  return (
    <div className="section">
      <div className="section1">
        <p id="paragraph">
          {typingText.split('').map((char, index) => (
            <span
              key={index}
              className={`char ${userInput[index] === char ? "correct" : ""} ${
                userInput[index] !== char && userInput[index] !== undefined ? "wrong" : ""
              } ${index === userInput.length ? "active" : ""}`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <div className="section2">
        <ul className="resultDetails">
          <li className="time">
            <p>Time Left:</p>
            <span><b>{timeLeft}</b>s</span>
          </li>
          <li className="mistake">
            <p>Mistakes:</p>
            <span>{mistakes}</span>
          </li>
          <li className="wpm">
            <p>WPM:</p>
            <span>{Math.round(WPM)}</span>
          </li>
          <li className="cpm">
            <p>CPM:</p>
            <span>{Math.round(CPM)}</span>
          </li>
          <button onClick={resetGame} className="btn">Try Again</button>
        </ul>
        {/* {gameOver && <div className="game-over-message">Time's up! Click "Try Again" to restart.</div>} */}
      </div>
    </div>
  );
};

export default TypingArea;
