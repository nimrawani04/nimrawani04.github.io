import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export const DecryptedText = ({ 
  text, 
  className = "", 
  speed = 50,
  maxIterations = 10
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text.split("").map(() => " "));
  const [isDecrypting, setIsDecrypting] = useState(true);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
      );

      if (iteration >= text.length) {
        setIsDecrypting(false);
        clearInterval(interval);
      }

      iteration += 1 / maxIterations;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText.join("")}
    </motion.span>
  );
};
