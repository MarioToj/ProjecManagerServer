import { startApolloServer } from './app.js';
import { connectDb } from './db.js';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';
 
connectDb()
startApolloServer(typeDefs, resolvers)
