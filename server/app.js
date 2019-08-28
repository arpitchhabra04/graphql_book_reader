const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//cross origin access
app.use(cors());

// mongoose.Promise = global.Promise;
//connect to mlab database

mongoose.connect("mongodb://127.0.0.1:27017/gql_arpit", {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb database connection established successfully");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server Running at PORT 4000");
});
