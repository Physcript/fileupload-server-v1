
const { GraphQLUpload,graphqlUploadExpress } = require('graphql-upload')
const { UserInputError } = require('apollo-server-express')
const { CREATE_USER_VALIDATION } = require('../../utils/validation')

const { getUrl } = require('../../utils/cloud')

const bcrypt = require('bcrypt')

const User = require('../../models/User')

module.exports = {
    Upload: GraphQLUpload,

    Query: {
        async _(){
            return "dummy"
        }
    },
    Mutation: {
        async _(){
            return "dummy"
        },
        async createUser( _,{ firstName,lastName,email,password,confirmPassword,files}){

            console.log(firstName,lastName,email,password,confirmPassword,files)
            try {
                let url = ''
                
                if(!files){
                    url = 'https://res.cloudinary.com/dnnq8kne2/image/upload/c_scale,h_300,w_300/v1632400237/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju_sozidd.jpg'
                }else{
                    url = files
                }
                if(!valid){
                    throw new UserInputError('Errors', {
                        errors
                    })
                }  

                const encrypt = await bcrypt.hash(password,8)

                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    image: files,
                    createdAt: new Date().toISOString(),
                    verified: false
                })


                await user.save()

            return "user created"
            }
            catch(e) {
                return e
            }
        },
        async uploadFile(_,{files}) {
            return getUrl(files)
        }
    }
}