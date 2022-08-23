const router = require("express").Router();
const {
  getAll,
  addProperty,
  addPropertyImg,
  deleteProperty,
  getOne,
  updateProperty,
  deletePropertyImg,
} = require("../controllers/property.contorller");
const upload = require("../helpers/multer");

router.get("/", getAll);
router.get("/:_id", getOne);
router.post("/", upload.array("images"), addProperty);
router.patch("/:_id", updateProperty);
router.post("/:_id", upload.array("images"), addPropertyImg);
router.delete("/:_id", deleteProperty);
router.delete("/:_id", deletePropertyImg);

module.exports = router;
