

const { gql } = require('apollo-server-express')

module.exports = gql`

    scalar Upload

    type File {
        filname: String
        mimetype: String
        encoding: String
        url: String
    }

    type User {
        firstName: String
        lastName: String
        email: String
        password: String
        image: String
        token: String
        verified: String
        createdAt: String
    }

    type Query {
        _: String
    }
    type Mutation {
        _: String

        createUser( 
            firstName: String 
            lastName: String
            email: String
            password: String
            confirmPassword: String
            files: String
            ): String
        
        uploadFile(files: Upload):String
        
    }

`