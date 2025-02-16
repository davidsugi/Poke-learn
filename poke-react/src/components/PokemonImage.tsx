import React from 'react'
import styled from 'styled-components';
import {motion } from 'framer-motion';
import useStore from '../services/store';

type PokemonProps = {
  img: string;
  disableAnimation?: boolean;
}

const PokemonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  transform: translateY(-8vh);
`

const PokemonImage = styled.img`
  object-fit: contain;
  background-color: white;
  border-radius: 100%;
  height: 10vw;
  width: 10vw;
`

const ImageVariants = {
  hidden: { transform: "scale(0)" },
  visible: { transform: "scale(1)" },
};

export default function Pokemon({ img, disableAnimation }: PokemonProps) {
  const increase = useStore((state) => state.increase);
  if (!img) return null;

  return (
    <PokemonContainer>
      {disableAnimation ? (
        <PokemonImage src={img} alt={`pokemon icon ${img}`} />
      ) : (
        <motion.div
          variants={ImageVariants}
          initial="hidden"
          animate={"visible"}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
          }}
          onUpdate={(latest) => {
            const isHidden=latest.transform==="scale(0)";
            if(isHidden){
              increase();
            }
          }}
        >
          <PokemonImage src={img} alt={`pokemon icon ${img}`} />
        </motion.div>
      )}
    </PokemonContainer>
  );
}
