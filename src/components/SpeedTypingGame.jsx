import React, { useState, useEffect, useRef } from "react";
import "./SpeedTypingGame.css";
import TypingArea from "./TypingArea";

const SpeedTypingGame = () => {
  const paragraphs = [
    "A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on. Parts of Plants: The part of the plant that developed beneath the soil is referred to as root and the part that grows outside of the soil is known as shoot. The shoot consists of stems, branches, leaves, fruits, and flowers. Plants are made up of six main parts: roots, stems, leaves, flowers, fruits, and seeds.",

    "The root is the part of the plant that grows underground. The primary root emerges from the embryo and serves to anchor the plant in the soil while absorbing essential minerals and nutrients. There are three main types of roots: tap roots, adventitious roots, and lateral roots. Roots originate from various parts of the plant, not from rhizomes.",

    "The stem is the portion of the plant that remains above the ground and grows away from gravity (negatively geotropic). It features internodes and nodes and supports other plant parts such as branches, buds, leaves, petioles, flowers, and inflorescences. The stem's young, newly developed parts are typically green, while mature trees have brown bark. Roots arise from different parts of the plant rather than from rhizomes.",
    "A flower is the reproductive part of a plant that produces seeds, which can develop into new plants. Flowers typically consist of four main parts: sepals, petals, stamens, and carpels. The carpels form the female part of the flower. Most flowers are hermaphroditic, containing both male and female components, while others may have only one set of reproductive organs.",
    
    "An aunt is sometimes humorously likened to a bassoon from a particular perspective. Estimations suggest that the melic Myanmar might be less substantial than kutcha. Foods and blowzy bows are often seen as inseparable. The scampish closet may reveal itself as a sclerous llama to those who observe it. A hip is metaphorically referred to as the skirt of a peak. Some hempy laundries are considered orchids. A gum can be viewed as a trumpet from a particular angle. The concept of a freebie flight is likened to a wrench of the mind, and there are various other whimsical notions associated with these terms."
  ];

  const [typingText, setTypingText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    loadNewParagraph();
  }, []);

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          updateMetrics();
          if (newTime <= 0) setIsTyping(false);
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
      />
      <TypingArea
        typingText={typingText}
        userInput={userInput}
        timeLeft={timeLeft}
        mistakes={mistakes}
        WPM={WPM}
        CPM={CPM}
        resetGame={resetGame}
      />
    </div>
  );
};

export default SpeedTypingGame;
