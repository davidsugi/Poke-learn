const axios = require('axios');
const https = require('https');
const ipv4Agent = new https.Agent({ family: 4 });

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    pokemon: async (parent, { id }, context, info)=> {
      const parsedId = Number(id);
      const validId = isNaN(parsedId) || !parsedId ? 1 : parsedId;

      const url = `${POKEAPI_BASE_URL}${validId}`;
      console.log("HIT API",url)
      try {
        // Try the request with default system resolution
        const response = await axios.get(url, { timeout: 5000 });
        return response.data;
      } catch (error) {
        // Check if the error is likely due to IPv6 issues
        if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
          console.warn('IPv6 request failed, retrying with IPv4 fallback...');
          try {
            // Retry using the IPv4 agent
            const response = await axios.get(url, { httpsAgent: ipv4Agent, timeout: 5000 });
            return response.data;
          } catch (fallbackError) {
            console.error('IPv4 fallback also failed:', fallbackError.message);
            throw new Error(fallbackError.message);
          }
        } else {
          console.error('Error fetching Pokemon:', error.message?.message);
          throw new Error(error.message);
        }
      }
    }
  }
};


module.exports = resolvers;
