const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Import Environment variables from .env
require("dotenv").config();

// Import typedefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

const User = require("./models/User");
const Post = require("./models/Post");

// Connect to MongoDb Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected"))
  .catch(error => console.error(error));

// Create Apollo GraphQL Server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
