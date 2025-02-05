import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

interface PokemonType {
  type: {
    name: string;
  }
}

interface Pokemon {
  name: string;
  sprites: {
    officialArtwork: {
      frontDefault: string | null;
    };
  };
  types: PokemonType[];
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const fetchPokemon = async (id: number = 1) => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetPokemon($id: Int!) {
              getPokemon(id: $id) {
                name
                types {
                  type {
                    name
                  }
                }
                sprites {
                  officialArtwork {
                    frontDefault
                  }
                }
              }
            }
          `,
          variables: {
            id
          }
        })
      });

      const data = await response.json();
      setPokemon(data.data.getPokemon);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  useEffect(() => {
    fetchPokemon(2);  // Starting with Pokemon #2 like in Vue example
  }, []);

  return (
    <>
      <header>
        <h1>Poke React</h1>
      </header>

      <main>
        {pokemon && (
          <div className="pokemon-container">
            <h2>{pokemon.name}</h2>
            {pokemon.sprites?.officialArtwork?.frontDefault && (
              <img 
                src={pokemon.sprites.officialArtwork.frontDefault}
                alt={pokemon.name}
              />
            )}
            <div className="types">
              {pokemon.types.map((type) => (
                <span key={type.type.name} className="type">
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
