require('dotenv').config()
//
const express = require('express')
const mongoose = require('mongoose')

// graphql
const { ApolloServer } = require('apollo-server-express')
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const Server = async (typeDefs,resolvers) => {

    const app = express()
    app.use(graphqlUploadExpress())

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    })

    await server.start()

    server.applyMiddleware({
        app
    })

    const PORT = process.env.PORT || 4000

    mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true
    }).then( () => {
        console.log(`DATABASE CONNECTED`)
        app.listen(PORT, () => console.log(`PORT: ${PORT}`))
    })
    

}

Server(typeDefs,resolvers)
