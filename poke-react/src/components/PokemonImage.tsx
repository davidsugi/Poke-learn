import React from 'react'
import styled from 'styled-components';
import {motion } from 'framer-motion';

type PokemonProps = {
  img: string;
}

const PokemonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`

const PokemonImage = styled.img`
  object-fit: contain;
  background-color: white;
  border-radius: 100%;
  height: 10vw;
  width: 10vw;
`

export default function Pokemon({img}:PokemonProps) {
  if(!img) return null;

  return (
    <PokemonContainer>
      <motion.div
        initial={{ transform: "scale(0)" }}
        animate={{ transform: "scale(1)" }} 
        transition={{ 
          duration: 0.4, 
          repeat: Infinity, 
          repeatType: "reverse",
          repeatDelay: 2.3
        }}
        >
        <PokemonImage 
          src={img}
          alt={`pokemon icon ${img}`}
        />
      </motion.div>
    </PokemonContainer>
  )
}
