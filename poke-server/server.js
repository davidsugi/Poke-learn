const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schemas/index')
const root = require('./resolvers/index')
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for testing
}));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});