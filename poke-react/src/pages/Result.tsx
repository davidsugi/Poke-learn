import { motion } from 'framer-motion';
import { default as React } from 'react';
import styled from 'styled-components';
import { useConfig } from '../components/HOC/ConfigProvider';
import Pokemon from '../components/PokemonImage';
import Prompt from '../components/Prompt';
import useStore from '../services/store';
import { getAsciiVal } from '../utils';
import { TypeAnimation } from '../components/common/Typical';


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
            <LPContainer>
                {pokemon && (
                <motion.div
                      variants={boxVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale:0 }}
                      transition={{ duration: 1 }}
                  >
                        <div className="pokemon-container" onClick={()=> setPokemon(null)}>
                            <Pokemon disableAnimation img={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} />
                        </div>
                </motion.div>
                )}
                <Prompt>
                  <TypeAnimation word={`${CONFIG.CONGRATS.replace("{{replacer}}",name ?? "")} ${isShiny ? CONFIG.SHINY_TEXT : ""} ${pokemon?.name || ""}! ${POKE_DESCRIPTION}. ${isShiny ? CONFIG.SHINY_DESCRIPTION : ""}`}/>
                </Prompt>
            </LPContainer>
  )
}
