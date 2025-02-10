import { motion } from 'framer-motion';
import { default as React } from 'react';
import styled from 'styled-components';
import Pokemon from '../components/PokemonImage';
import Prompt from '../components/Prompt';
import useStore from '../services/store';


const Title = styled.h1`
font-family: 'PokeFont', sans-serif;
  font-size: 2rem;
  position: absolute;
  top: 5vh;
  font-size: 7vw;
  color: yellow;
  text-shadow: 
    -0.5vw -0.5vw 0 #0000FF,  
    0.5vw -0.5vw 0 #0000FF,
    -0.5vw 0.5vw 0 #0000FF,
    0.5vw 0.5vw 0 #0000FF;
`
  const LPContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  `
  
export default function Result() {
  const pokemon = useStore((state) => state.pokemon);
  const setPokemon = useStore((state) => state.setPokemon);

  const boxVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const isShiny = Math.floor(Math.random() * 100) % 7 === 0
  
  return (
        <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale:0 }}
            transition={{ duration: 1 }}
        >
            <LPContainer>
                <Title>My  Poke Bestie</Title>
                {pokemon && (
                <>
                <div className="pokemon-container" onClick={()=> setPokemon(null)}>
                    <Pokemon disableAnimation img={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} />
                </div>
                </>
                )}
                <Prompt>
                    <span>Congrats! Your Poke-Bestie is {isShiny && "Shiny"} {pokemon?.name || ""}!
                    <br></br> A truly loyal companion! <br />
                    {isShiny && "And HEY ITS SHINY AS WELL! What a struck of luck!"}
                    </span>
                </Prompt>
            </LPContainer>
        </motion.div>
  )
}
