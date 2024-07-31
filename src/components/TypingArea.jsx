import React from "react";

const TypingArea = ({
  typingText,
  userInput,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  resetGame
}) => {
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
            <span>{Math.round(WPM, 2)}</span>
          </li>
          <li className="cpm">
            <p>CPM:</p>
            <span>{Math.round(CPM, 2)}</span>
          </li>
        </ul>
        <button onClick={resetGame} className="btn">Try Again</button>
      </div>
    </div>
  );
};

export default TypingArea;
