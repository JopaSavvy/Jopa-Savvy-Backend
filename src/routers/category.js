const router = require("express").Router();
const {
  addCategory,
  getAll,
  getOne,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

router.get("/", getAll);
router.get("/:_id", getOne);
router.post("/", addCategory);
router.patch("/_id", updateCategory);
router.delete("/_id", deleteCategory);

module.exports = router;
