import { motion } from 'framer-motion';
import { ChangeEvent, default as React, useRef, useState } from 'react';
import Pokemon from '../components/PokemonImage';
import { getAsciiVal } from '../utils';
import { useQuery } from '@apollo/client';
import useStore from '../services/store';
import { GET_POKE } from '../graphql/queries';
import AssetLoader from '../components/AssetLoader';
import Prompt from '../components/Prompt';
import styled from 'styled-components';
import RoundedInput from '../components/RoundedInput';


interface PokemonType {
    type: {
      name: string;
    }
  }
  
  interface Pokemon {
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
  const [text,setText]=useState("")
  const { loading, error, data } = useQuery<{pokemon: Pokemon}>(GET_POKE, {
    variables: { id:pokemonId },
  });
  
  const timer = useRef<NodeJS.Timeout | null>(null)
  const setPokemon = useStore((state) => state.setPokemon);
  const pokemon = useStore((state) => state.pokemon);

  // Update local state when data is fetched
  React.useEffect(() => {
    if (data && data.pokemon) {
      setPokemon(data.pokemon);
    }
  }, [data, setPokemon]); // This effect runs every time data is updated

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
                    <Pokemon img={pokemon.sprites?.front_default} />
                </div>
                <RoundedInput value={text} onChange={onInputchange} />
                </>
                )}
                <Prompt />
            </LPContainer>
        </motion.div>
  )
}
