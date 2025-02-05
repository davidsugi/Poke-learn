import './App.css';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKE } from './graphql/queries';

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

const getAsciiVal = (str: string)=>{
  let letTotal = 0;

  for (let i = 0; i < str.length; i++) {
    letTotal+=str.charCodeAt(i);
  }
  return letTotal%1025
}
export default function App() {
  const [pokemonId, setPokemonId] = useState(151); // Initial Pokemon ID
  const [text,setText]=useState("")
  const { loading, error, data } = useQuery<{pokemon: Pokemon}>(GET_POKE, {
    variables: { id:pokemonId },
  });
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null)


  // Update local state when data is fetched
  React.useEffect(() => {
    if (data && data.pokemon) {
      setPokemon(data.pokemon);
    }
  }, [data]); // This effect runs every time data is updated

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
    // console.log(pokemon, data)
  return (
    <div>
    <header>
      <h1>Poke React</h1>
    </header>
    <main>
      {pokemon && (
        <div className="pokemon-container">
          <input value={text} onChange={onInputchange} />
          <h2>{pokemon.name}</h2>
          {pokemon.sprites?.front_default && (
            <img 
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          )}
          <div className="types">
            {pokemon.types?.map((type) => (
              <span key={type.type.name} className="type">
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
    </div>
  )
}

