import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { ChangeEvent, default as React, useRef, useState } from 'react';
import styled from 'styled-components';
import Pokemon from '../components/PokemonImage';
import Prompt from '../components/Prompt';
import RoundedInput from '../components/RoundedInput';
import { GET_POKE } from '../graphql/queries';
import useStore from '../services/store';
import { getAsciiVal } from '../utils';
import { INITIAL_POKEMON_IMG, POKEMON_IMG_URL } from '../const';


interface PokemonType {
    type: {
      name: string;
    }
  }
  
  interface PokemonData {
    name: string;
    sprites: {
      front_default: string;
    };
    types: PokemonType[];
  }
const Title = styled.h1`
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
  
export default function LandingPage() {
  const [pokemonId, setPokemonId] = useState(151); // Initial Pokemon ID
  const [pkImage, setPkImage] = useState(INITIAL_POKEMON_IMG[0])
  const [text,setText]=useState("")
  const { loading, error, data } = useQuery<{pokemon: PokemonData}>(GET_POKE, {
    variables: { id:pokemonId },
  });
  
  const timer = useRef<NodeJS.Timeout | null>(null)
  const setPokemon = useStore((state) => state.setPokemon);
  const pokemon = useStore((state) => state.pokemon);
  const handPos = useStore((state) => state.handPosition);

  // Update local state when data is fetched
  React.useEffect(() => {
    if (data && data.pokemon) {
      setPokemon(data.pokemon);
    }
  }, [data, setPokemon]); // This effect runs every time data is updated


  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * INITIAL_POKEMON_IMG.length);
    setPkImage(INITIAL_POKEMON_IMG[randomIndex]);
  }, [handPos]); // This effect runs every time handPos is updated

  const onInputchange = (e:ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value);
    
    if (timer.current) {
      clearTimeout(timer.current); // Clear the previous timeout if there's one
    }

    timer.current = setTimeout(() => {
      setPokemonId(getAsciiVal(e.target.value));
      // Update the state after a short delay (throttling)
    }, 1000); // 500ms delay between user inputs
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const boxVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  
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
                <div className="pokemon-container">
                    <Pokemon img={pkImage} />
                </div>
                <RoundedInput value={text} onChange={onInputchange} />
                </>
                )}
                <Prompt />
            </LPContainer>
        </motion.div>
  )
}
