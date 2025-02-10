import { gql } from '@apollo/client';

export const GET_POKE = gql`
query GetPokemon($id: ID!) {
  pokemon(id: $id) {
    name
    types {
      type {
        name
      }
    }
    sprites {
      front_default
      front_shiny
    }
  }
}
`;
