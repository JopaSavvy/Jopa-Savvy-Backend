const { storage } = require("../config/firebase.config");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const imagesUrl = async (imagesBuffer = [], folderName) => {
  let images = [];
  for(const f of imagesBuffer){
    const imgRef = ref(
      storage,
      `property_images/${folderName}/${f.originalname}`
    );
    const uploadTask = await uploadBytes(imgRef, f.buffer, {
      contentType: "image/jpeg",
    });
    const url = await getDownloadURL(uploadTask.ref);
    images.push(url);
  }
  return images
};
module.exports = imagesUrl;
