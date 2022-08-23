const Category = require("../models/category");
const { statusCodes } = require("../helpers/constants");
const { Schema } = require("../helpers/validators/category");
const getId = require("../helpers/getId")

exports.addCategory = async (req, res) => {
  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ status: "error", message: error.message });
  }
  try {
    const id = await getId(Category)
    const category = new Category({name: value.name, categoryId: id});
    await category.save();
    res.status(statusCodes.CREATED).send({ status: "success", data: category });
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).send({
      status: "error",
      message: error.message || "Failed to add category. Try again",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res
        .status(statusCodes.NO_CONTENT)
        .send({ status: "error", message: "No category found" });
    }
    res.status(statusCodes.OK).send({ status: "success", data: categories });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "Failed to retrieve categories. Try again",
    });
  }
};

exports.getOne = async (req, res) => {
  const { _id } = req.params;
  try {
    const category = await Category.findById(_id);
    if (!category) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ status: "error", message: "No category found" });
    }
    res.status(statusCodes.Ok).send({ status: "success", data: category });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "Failed to retrieve category. Try again",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { _id } = req.params;
  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ status: "error", message: error.message });
  }
  const updates = Object.keys(value);
  try {
    const category = await Category.findById(_id);
    if (!category) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ status: "error", message: "Category not found" });
    }
    for (const update of updates) {
      category[update] = value[update];
    }
    await category.save();
    res
      .status(statusCodes.ACCEPTED)
      .send({ status: "success", data: category });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "Failed to update category. Try again",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { _id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(_id);
    res.status(statusCodes.OK).send({ status: "success", data: category });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "Failed to delete category. Try again",
    });
  }
};
