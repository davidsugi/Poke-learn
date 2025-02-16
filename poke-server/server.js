const express = require('express');
const cors = require('cors');
const typeDefs = require('./schemas/index');
const root = require('./resolvers/index');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { mock } = require('./mock/pokemon'); // Ensure correct destructuring
app.use(cors());

console.log(process.env, process.env.IS_MOCK === 'true')
async function startApolloServer() {
  // Create an instance of Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers: root,
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    mocks: process.env.IS_MOCK === 'true' ? mock : false, // Ensure this is correctly passed
    mockEntireSchema:  process.env.IS_MOCK === 'true',
  });
  await server.start();

  // Apply Apollo middleware to your Express app at the /graphql endpoint
  server.applyMiddleware({ app, path: '/graphql' });

  // Start your Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();

module.exports = app; // Export the app