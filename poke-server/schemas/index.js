const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

// Read the schema file
const typeDefs = fs.readFileSync(path.join(__dirname, '/schema.gql'), 'utf8');

const schemas = buildSchema(`
  type Query {
    hello: String
    pokemon(id: ID!): Pokemon
  }

  type User {
    id: ID!
    name: String
    email: String
  }

  type Pokemon {
    id: ID!
    name: String!
    base_experience: Int
    height: Int!
    weight: Int!
    abilities: [Ability!]!
    forms: [Form!]!
    stats: [Stat!]!
    types: [Type!]!
    sprites: Sprites!
  }
  
  type Ability {
    ability: NamedResource!
    is_hidden: Boolean!
    slot: Int!
  }
  
  type NamedResource {
    name: String!
    url: String!
  }
  
  type Form {
    name: String!
    url: String!
  }
  
  type Stat {
    base_stat: Int!
    effort: Int!
    stat: NamedResource!
  }
  
  type Type {
    slot: Int!
    type: NamedResource!
  }
  
  type Sprites {
    front_default: String
    front_shiny: String
    back_default: String
    back_shiny: String
  }
`);


module.exports = schemas