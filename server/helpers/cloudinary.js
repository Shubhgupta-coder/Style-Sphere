const cloudinary = require('cloudinary').v2;
const multer =   require('multer');

cloudinary.config({
    cloud_name : 'dpidce6hj',
    api_key : '855669931174867',
    api_secret : 'qKAPWGaWVKrwqruzOLHqQye8aHc'
});

// multer for uploading image
const storage  = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result;
}

const upload =  multer({storage});

module.exports = {upload,imageUploadUtil};