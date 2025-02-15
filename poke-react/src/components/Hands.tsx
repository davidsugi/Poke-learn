import React from 'react'
import HandImg from "../assets/img/Hands.png";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HandImage = styled.img`
  width: 100px;
  height: 100px;  
`

type IHandProps = {
  isVisible?: boolean;
}

export default function Hands({isVisible}:IHandProps) {
  return (
    <motion.div
      initial={{ transform: "translateY(-5vh)" }}
      animate={{ transform: "translateY(2vh)" }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      style={{ position: "absolute", top: "-9vw", opacity: isVisible ? "1" : "0"}}
    >
      <HandImage src={HandImg} alt="handicon" />
    </motion.div>
  )
}
