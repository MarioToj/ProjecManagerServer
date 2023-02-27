import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';

import express from 'express'
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

export const startApolloServer = async (typeDefs, resolvers) => {

    dotenv.config()    

    const port = process.env.PORT

    const app = express()
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()

    app.use("/graphql", cors(), express.json(), expressMiddleware(server) )

    await new Promise(resolve => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}