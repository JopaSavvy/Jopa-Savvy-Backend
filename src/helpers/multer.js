const multer = require("multer")

const upload = multer({
  // dest: "images",
  limits: {
    fileSize: 10000000
  },
  fileFilter(req,file,cb){
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if(!file.originalname.match(new RegExp(/\.(png|jpg|jpeg)$/))){
      cb(new Error("File must be an image"))
      return
    }
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(undefined, true);
  }
})

module.exports = upload