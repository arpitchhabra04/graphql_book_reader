const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
// mongoose.Promise = global.Promise;
//connect to mlab database

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb database connection established successfully");
});
mongoose.connection.once("open", () => {
  console.log("connected to database");
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
