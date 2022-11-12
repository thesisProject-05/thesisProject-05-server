const cloudinary = require("cloudinary").v2;
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// sending image to cloudinary
sendToCloud = (path, data)=>{
    return cloudinary.uploader
    .upload(path, {
        data,
    }).then((data)=>{
        return { url: data.url, public: data.public_id}
    }).catch((error)=>{
        console.log('cant upload img bcs ==>',error);
    });
};
 // removing image from cloudinary
 removeFromCloud = async (public_id)=>{
    await cloudinary.uploader
    .destroy(public_id,(error,result)=>{
        error ? console.log('dlt img error==>',error) : console.log('dlt img seccues ==>',result)
    })
 };

 module.exports = {sendToCloud, removeFromCloud};