import React from 'react'
import HandImg from "../assets/img/Hands.png";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HandImage = styled.img`
  width: 100px;
  height: 100px;  
`

export default function Hands() {
  return (
    <motion.div
      initial={{ transform: "translateY(-20px)" }}
      animate={{ transform: "translateY(5px)" }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      style={{ position: "absolute", top: "-9vw" }}
    >
      <HandImage src={HandImg} alt="handicon" />
    </motion.div>
  )
}
