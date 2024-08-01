import React, { useState, useEffect, useRef } from "react";
import "./SpeedTypingGame.css";
import TypingArea from "./TypingArea";

const SpeedTypingGame = () => {
  const paragraphs = [
    "In a world brimming with rapid technological advancements, typing speed and accuracy have become essential skills for many professionals. With the advent of sophisticated communication tools and a greater emphasis on digital productivity, the ability to type quickly and efficiently can significantly enhance one’s workflow. Mastering touch typing techniques allows users to convey their thoughts with precision, ensuring that information is transmitted seamlessly and without delay. As we continue to integrate technology into every facet of our lives, honing our typing skills remains a crucial aspect of modern literacy.",

    "The art of typing has evolved from the early days of mechanical typewriters to the sleek, high-speed keyboards we use today. Typing tests are an excellent way to measure one’s proficiency and identify areas for improvement. Regular practice not only increases typing speed but also improves accuracy, which is vital for tasks requiring detailed data entry or extensive written communication. By focusing on consistent practice and proper hand placement, individuals can build muscle memory and achieve remarkable typing efficiency over time.",

    "Efficient typing is more than just a convenience; it is a competitive edge in various fields, including administrative roles, content creation, and programming. Accurate typing ensures that work is completed swiftly, reducing the likelihood of errors and enhancing overall productivity. Many typing applications offer challenges and exercises designed to push the boundaries of speed and accuracy, motivating users to reach new milestones. These tools help track progress, set personal goals, and celebrate achievements in typing proficiency.",

    "In today’s digital age, typing skills are indispensable for navigating the myriad of tasks we encounter daily. Whether drafting emails, writing reports, or coding complex algorithms, the speed at which one can type directly impacts efficiency. Typing practice applications simulate real-world scenarios, providing users with diverse text samples and timed tests to refine their skills. By regularly engaging with these typing exercises, individuals can maintain a high level of dexterity and adapt to the ever-increasing demands of the modern workplace.",
    
    "As we embrace a more digitized world, the importance of rapid and accurate typing cannot be overstated. Typing tests are not only useful for assessing one's current abilities but also for setting benchmarks and tracking improvement over time. With a variety of typing challenges available, users can continuously push their limits, making typing tests both a practical tool for skill enhancement and a source of enjoyment. Through dedicated practice, users can develop exceptional typing speed and precision, paving the way for greater success in their professional and personal endeavors."
  ];

  const [typingText, setTypingText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    loadNewParagraph();
  }, []);

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsTyping(false);
            setGameOver(true);
            clearInterval(timer);
          } else {
            updateMetrics();
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTyping, timeLeft]);

  const loadNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const selectedText = paragraphs[randomIndex];
    setTypingText(selectedText);
    setUserInput("");
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
    setTimeLeft(60);
    setGameOver(false);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    if (!isTyping) setIsTyping(true);

    const typedText = e.target.value;
    setUserInput(typedText);

    if (typedText.length > 0) {
      const currentChar = typingText[charIndex];
      if (typedText[typedText.length - 1] === currentChar) {
        setCharIndex((prevIndex) => prevIndex + 1);
        if (charIndex === typingText.length - 1) {
          setIsTyping(false);
        }
      } else {
        setMistakes((prevMistakes) => prevMistakes + 1);
      }
      updateMetrics();
    }
  };

  const updateMetrics = () => {
    const correctChars = charIndex - mistakes;
    const totalChars = typingText.length;
    const elapsedTime = 60 - timeLeft;

    setCPM((correctChars / (elapsedTime / 60)) || 0);
    setWPM((correctChars / 5 / (elapsedTime / 60)) || 0);
  };

  const resetGame = () => {
    setCharIndex(0);
    setMistakes(0);
    setUserInput("");
    setWPM(0);
    setCPM(0);
    setTimeLeft(60);
    setGameOver(false);
    loadNewParagraph();
  };

  return (
    <div className="container">
      <input
        ref={inputRef}
        type="text"
        className="input-field"
        value={userInput}
        onChange={handleInputChange}
        disabled={gameOver}
      />
      <TypingArea
        typingText={typingText}
        userInput={userInput}
        timeLeft={timeLeft}
        mistakes={mistakes}
        WPM={WPM}
        CPM={CPM}
        resetGame={resetGame}
        gameOver={gameOver}
      />
    </div>
  );
};

export default SpeedTypingGame;