const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Read the schema file
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8');
const schema = buildSchema(typeDefs);

// Define resolvers
const root = {
  getPokemon: async ({ id }) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = response.data;
      
      // Transform the response to match our schema
      return {
        abilities: data.abilities,
        baseExperience: data.base_experience,
        cries: data.cries,
        forms: data.forms,
        gameIndices: data.game_indices.map(gi => ({
          gameIndex: gi.game_index,
          version: gi.version
        })),
        height: data.height,
        heldItems: data.held_items.map(item => item.item.name),
        id: data.id,
        isDefault: data.is_default,
        locationAreaEncounters: data.location_area_encounters,
        moves: data.moves.map(move => ({
          move: move.move,
          versionGroupDetails: move.version_group_details.map(vgd => ({
            levelLearnedAt: vgd.level_learned_at,
            moveLearnMethod: vgd.move_learn_method,
            versionGroup: vgd.version_group
          }))
        })),
        name: data.name,
        order: data.order,
        pastAbilities: data.past_abilities || [],
        pastTypes: data.past_types || [],
        species: data.species,
        sprites: {
          dreamWorld: data.sprites.other.dream_world,
          home: data.sprites.other.home,
          officialArtwork: data.sprites.other['official-artwork'],
          showdown: data.sprites.other.showdown
        },
        stats: data.stats.map(stat => ({
          baseStat: stat.base_stat,
          effort: stat.effort,
          stat: stat.stat
        })),
        types: data.types,
        weight: data.weight
      };
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      return null;
    }
  }
};

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for testing
}));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});