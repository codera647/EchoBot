import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      if (onTypingComplete) {
        onTypingComplete(); 
      }
    }
  }, [index, text, onTypingComplete]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
