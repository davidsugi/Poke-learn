import { motion } from 'framer-motion';
import { default as React } from 'react';
import styled from 'styled-components';
import { useConfig } from '../components/ConfigProvider';
import Pokemon from '../components/PokemonImage';
import Prompt from '../components/Prompt';
import useStore from '../services/store';
import { useScreenshot } from '../components/HOC/ScreenCapt';
import { getAsciiVal } from '../utils';


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
  const name = useStore((state) => state.name);
  const setPokemon = useStore((state) => state.setPokemon);
  const {handleScreenshot} = useScreenshot();
  const CONFIG = useConfig().RESULT_PAGE;

  const boxVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const isShiny = Math.floor(Math.random() * 100) % 7 === 0
  const POKE_DESCRIPTION = CONFIG.RESULT_VARIANTS[getAsciiVal(name||"")%9]
  return (
        <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale:0 }}
            transition={{ duration: 1 }}
        >
            <LPContainer>
                {pokemon && (
                <>
                <div className="pokemon-container" onClick={()=> setPokemon(null)}>
                    <Pokemon disableAnimation img={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} />
                </div>
                <button onClick={handleScreenshot}>
                  capture!
                </button>
                </>
                )}
                <Prompt>
                    <span>{CONFIG.CONGRATS.replace("{{replacer}}",name ?? "")} {isShiny && CONFIG.SHINY_TEXT} {pokemon?.name || ""}!
                    <br></br> {POKE_DESCRIPTION} <br />
                    {isShiny && CONFIG.SHINY_DESCRIPTION}
                    </span>
                </Prompt>
            </LPContainer>
        </motion.div>
  )
}
