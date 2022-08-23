const router = require("express").Router();
const {
  updateProperty,
  addProperty,
  addPropertyImg,
  deleteProperty,
  deletePropertyImg
} = require("../controllers/property.contorller");
const upload = require("../helpers/multer");

// router.patch("/:_id", updateProperty);
// router.post("/", upload.array("images"), addProperty);
// router.post("/:_id", upload.array("images"), addPropertyImg);
// router.delete("/:_id", deleteProperty);
// router.delete("/:_id", deletePropertyImg);

module.exports = router;