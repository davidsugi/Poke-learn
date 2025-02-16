import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { default as React, useState } from 'react';
import styled from 'styled-components';
import { useConfig } from '../components/ConfigProvider';
import Loader from '../components/Loader';
import Pokemon from '../components/PokemonImage';
import Prompt from '../components/Prompt';
import RoundedInput from '../components/RoundedInput';
import { INITIAL_POKEMON_IMG } from '../const';
import { GET_POKE } from '../graphql/queries';
import { useInput } from "../hooks/useInput";
import useStore, { Pokemon as PokemonData } from '../services/store';
  const LPContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  `
  
export default function LandingPage() {
  const [pkImage, setPkImage] = useState(INITIAL_POKEMON_IMG[0])
  const {pokemonId, text, onInputchange} =  useInput();
  const CONFIG = useConfig().LANDING_PAGE
  const { loading, error, data } = useQuery<{pokemon: PokemonData}>(GET_POKE, {
    variables: { id:pokemonId  ?? 1 },
  });
  
  const setPokemon = useStore((state) => state.setPokemon);
  const handPos = useStore((state) => state.handPosition);

  // Update local state when data is fetched
  React.useEffect(() => {
      if (data && data.pokemon && pokemonId !==0 ) {
      setPokemon(data.pokemon);
    }
  }, [data, setPokemon, pokemonId]); // This effect runs every time data is updated


  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * INITIAL_POKEMON_IMG.length);
    setPkImage(INITIAL_POKEMON_IMG[randomIndex]);
  }, [handPos]); // This effect runs every time handPos is updated


  if (loading) return <Loader />
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
                <>
                    <div className="pokemon-container">
                        <Pokemon img={pkImage} />
                    </div>
                    <RoundedInput value={text} onChange={onInputchange} />
                </>
                <Prompt>
                  <span>
                  {CONFIG.DESCRIPTION}
              </span>
                </Prompt>
            </LPContainer>
        </motion.div>
  )
}
