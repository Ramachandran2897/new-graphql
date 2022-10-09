const {ApolloServer} = require("apollo-server");
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const server = new ApolloServer({typeDefs, resolvers, context:({req})=>{
    //it should handle the request and response mainly used for auth purpose
    return {req}
}});
server.listen().then(({url})=>{
 console.log(`started the ${url}`)
})
