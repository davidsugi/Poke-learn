import React from 'react';
import AnimatedSvg from './AnimatedSvg';
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div 
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360, scale: 0.8 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}   
    >
        <AnimatedSvg />
    </motion.div>
  );
}
