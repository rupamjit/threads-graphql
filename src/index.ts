import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json())

  // Create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs:  `
    type Query {
    hello:String
    say(name:String):String
    }

    `  ,// Schemas
    resolvers: {
        Query:{
            hello:()=>`Hey there i am graphql server`,
            say:(_,{name}:{name:string})=>`Hey ${name},How are you?`
        }
    },
  });

  // start the gql server
  await gqlServer.start()

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running!!!" });
  });

  // @ts-ignore
  app.use("/graphql", expressMiddleware(gqlServer))

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init()