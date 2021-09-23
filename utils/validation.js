

const validator = require('validator')
const User = require('../models/User')


const CREATE_USER_VALIDATION = async (firstName,lastName,email,password,confirmPassword) => {

    const errors = {}
    const user = await User.findOne({email})

    if(user){
        errors.email = 'Email already exist'
    }
    if(firstName.trim() == ''){
        errors.firstName = 'Firstname required'
    }
    if(lastName.trim() == ''){
        errors.lastName = 'Lastname required'
    }
    if(!validator.isEmail(email)){
        errors.email = 'Invalid email'
    }
    if(password.trim() == ''){
        errors.password = 'Password required'
    }
    if(confirmPassword.trim() == ''){
        errors.confirmPassword = 'Confirm Password required'
    }
    if(password !== confirmPassword){
        errors.password = 'Password not match'
        errors.confirmPassword = 'Confirm Password not match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }


}

module.exports = {
    CREATE_USER_VALIDATION
}