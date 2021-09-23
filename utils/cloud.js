require('dotenv').config()
const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});


const getUrl = async (files) => {

    const { filename,mimetype,encoding,createReadStream } = await files

    let streamUpload = (req) => {
       return new Promise((resolve,reject) => {
            let stream = cloudinary.v2.uploader.upload_stream( 
                (error,result) => {
                    if(result){
                        resolve(result)
                    }else{
                        reject(error)
                    }
                }
             )
             req().pipe(stream)
       }) 
    }

    const fileUpload = async (req) => {
        return await streamUpload(req)
    }

    const data = await fileUpload(createReadStream)
    const url = data.url.replace('upload/','upload/c_scale,h_300,w_400/')
    
    return url
}

module.exports = {
    getUrl
}