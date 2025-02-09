const axios = require('axios');

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const resolvers = {
  hello: () => 'Hello, World!',
  pokemon: async ({ id }) => {
    try {
      const response = await axios.get(`${POKEAPI_BASE_URL}/${id}`);
      const data = response.data;
      
      // Transform the response to match our schema
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      return null;
    }
  }
};


module.exports = resolvers;
