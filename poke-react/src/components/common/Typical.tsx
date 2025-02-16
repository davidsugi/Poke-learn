import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import {type as types } from "@camwiegert/typical";
import "./Typical.css"
/**
 * TypeAnimation Component
 * @param {Object} props
 * @param {Array} props.word - An array of word (e.g. strings, numbers for delay, or functions)
 */
type TypeAnimationProps = {
    word: string
}

export const TypeAnimation: React.FC<TypeAnimationProps> = ({ word }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    async function runType() {
      if (textRef.current) {
        let curWords = ""
        const stepIs = word.split(" ").map((word)=>{
            return curWords+=word+" "
        })
        await types(textRef.current, ...stepIs);
        setIsFinished(true)
      }
    }
    runType();
  }, [word]);

  return <span className={!isFinished ? "typer" : ""} ref={textRef} />;
};
