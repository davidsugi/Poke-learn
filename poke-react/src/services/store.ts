// store.js
import { create } from 'zustand';

type PokeReactStore = {
    handPosition:number
    pokemon: null | Pokemon
    increase: ()=>void;
    setPokemon: (pokemon:Pokemon|null)=>void;
}

export interface PokemonType {
    type: {
      name: string;
    }
  }
  
  export interface Pokemon {
    name: string;
    sprites: {
      front_default: string;
      front_shiny: string;
    };
    types: PokemonType[];
  }
  

const useStore = create<PokeReactStore>((set) => ({
  // State: a simple counter
  handPosition: 0,
  pokemon: null,
  // Action: increment the counter
  increase: () => set((state: PokeReactStore) => ({ handPosition: (state.handPosition + 1)%3 })),
  setPokemon: (pokemon:Pokemon | null) => set((state: PokeReactStore) => ({ pokemon })),
  
  // You can add more state and actions as needed
}));

export default useStore;
