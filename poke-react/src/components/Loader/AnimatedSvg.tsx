import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
`;

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, 
    transition: { duration: 2, ease: "linear" }  
  }
};

const transitionCommon = {
  pathLength: { duration: 2, ease: "linear", 
    repeat: Infinity, 
    repeatType: "reverse"  },
    fill: { 
    duration: 2, 
    ease: "linear",
    repeat: Infinity, 
    repeatType: "reverse",
    delay: 0,
    repeatDelay: 0 
  }
};

const pathRedVariants = {
  hidden: { 
    fill: "rgba(255, 255, 255, 255)",
    pathLength: 0 
  },
  visible: { 
    fill: "#DF1818", 
    pathLength: 1, 
    transition: transitionCommon
  }
};

const pathLineVariants = {
  hidden: { 
    fill: "rgba(255, 255, 255, 255)",
    pathLength: 0 
  },
  visible: { 
    fill: "rgba(0, 0, 0, 0)", 
    pathLength: 1, 
    transition: transitionCommon
  }
};

export default function AnimatedSvg() {
  return (
    <SvgContainer>
      <motion.svg version="1.1" id="Pokéball" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	    viewBox="0 0 595.3 594.1"
        initial="hidden"
        animate="visible"
      >
        <motion.path
         id="Down" 
          d="M297.6,380.9c-40.4,0-74.1-28.6-82.1-66.6H81.1c9.5,110.5,102.2,197.2,215.1,197.2
			s205.7-86.7,215.1-197.2H379.7C371.7,352.4,338,380.9,297.6,380.9z"
         stroke="#000"
  strokeWidth="2"
  fill="transparent"
          variants={pathVariants}
        />
        <motion.path
          d="M347.1,297L347.1,297C347,297,347,297,347.1,297c-0.1-6.1-1.2-11.9-3.2-17.3
			c-7-18.8-25.1-32.1-46.3-32.1s-39.3,13.4-46.3,32.1c-2,5.4-3.1,11.2-3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0
			c0,6.1,1.1,11.9,3.1,17.3c7,18.8,25.1,32.1,46.3,32.1c21.2,0,39.3-13.4,46.3-32.1C346,309,347.1,303.1,347.1,297
			C347.1,297,347.1,297,347.1,297z"
          id="Center"
         stroke="#000"
  strokeWidth="2"
  fill="transparent"
          variants={pathVariants}
        />

        <motion.path
          d="M297.7,213.2c40.4,0,74.1,28.6,82.1,66.6h134.4C504.7,169.2,412,82.5,299,82.5S93.4,169.2,83.9,279.7
          h131.7C223.6,241.7,257.3,213.2,297.7,213.2z"
          id="Up"
         stroke="#000"
            strokeWidth="2"
          variants={pathRedVariants}
        />
    <motion.path
          d="M299,82.5c113,0,205.7,86.7,215.1,197.2H379.7c-8-38-41.7-66.6-82.1-66.6c-40.4,0-74.1,28.6-82.1,66.6H83.9
		C93.4,169.2,186.1,82.5,299,82.5z M343.9,279.7c2,5.4,3.1,11.2,3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0c0,6.1-1.1,11.9-3.1,17.3
		c-7,18.8-25.1,32.1-46.3,32.1c-21.2,0-39.3-13.4-46.3-32.1c-2-5.4-3.1-11.2-3.1-17.3c0,0,0,0,0,0h-0.1c0,0,0,0,0,0
		c0-6.1,1.1-11.9,3.1-17.3c7-18.8,25.1-32.1,46.3-32.1S336.9,261,343.9,279.7z M296.2,511.6c-113,0-205.7-86.7-215.1-197.2h134.4
		c8,38,41.7,66.6,82.1,66.6s74.1-28.6,82.1-66.6h131.7C501.9,424.8,409.2,511.6,296.2,511.6z M297.6,41.3
		C156.4,41.3,41.9,155.8,41.9,297s114.5,255.7,255.7,255.7S553.4,438.3,553.4,297S438.9,41.3,297.6,41.3z"
          id="Line"
         stroke="#000"
        strokeWidth="2"
        fill="transparent"
          variants={pathLineVariants}
        />
      </motion.svg>
    </SvgContainer>
  );
}
