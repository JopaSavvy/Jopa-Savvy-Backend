const Property = require("../models/property");
const Category = require("../models/category");
const imagesUpload = require("../helpers/imagesUpload");
const { statusCodes } = require("../helpers/constants");
const {
  newPropertySchema,
  updateSchema,
} = require("../helpers/validators/propertyValidators");
// const getId = require("../helpers/getId");
exports.addProperty = async (req, res) => {
  // Validating request body
  const { error, value } = newPropertySchema.validate(req.body);
  if (error) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ status: "error", message: error.message });
  }
  try {
    // checking if category name exist in database
    const category = await Category.findOne({ name: value.category });
    if (!category) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({
          status: "error",
          message: `category ${value.category} was not found`,
        });
    }
    // uploading propery images. Expect to get the url for the uploaded images
    const images = await imagesUpload(req.files, value.name);
    // removing category name from the req body because property model expects catefory to an object
    delete value.category;
    // creating or inserting the new property into the database
    const property = new Property({
      ...value,
      images,
      category: { name: category.name, categoryId: category?.categoryId },
    });
    await property.save();
    res.status(statusCodes.CREATED).send({ status: "success", data: property });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "Failed to add category. Try again",
    });
  }
};

exports.getAll = async (req, res) => {
  const match = {};
  if (req.query.category) {
    match.category = req.query.category.toLowerCase();
  }
  if (req.query.stockStatus) {
    match.stockStatus = req.query.stockStatus;
  }
  try {
    const properties = await Property.find({ ...match });
     if (!properties) {
       return res
         .status(statusCodes.NO_CONTENT)
         .send({ status: "error", message: "No category found" });
     }
    res.send({ status: "success", data: [...properties] });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message || "An error occured. Try again",
    });
  }
};
exports.getOne = async (req, res) => {
  const { _id } = req.params;
  try {
    const property = await Property.findById(_id);
    console.log("property")
     if (!property) {
       return res
         .status(statusCodes.BAD_REQUEST)
         .send({ status: "error", message: "No property found" });
     }
    res.status(statusCodes.OK).send({ status: "success", data: property });
  } catch (error) {
    console.log(error)
     if (error.kind == "ObjectId") {
       return res
         .status(statusCodes.BAD_REQUEST)
         .send({ status: "error", message: "No category found" });
     }
    res
      .status(400)
      .send({ status: "error", message: error.message || "An error occured" });
  }
};
exports.addPropertyImg = async (req, res) => {
  const { _id } = req.params;
  try {
    const property = await Property.findById(_id);
     if (!property) {
       return res
         .status(statusCodes.BAD_REQUEST)
         .send({ status: "error", message: "No property found" });
     }
    const images = await imagesUpload(req.files, property.name);
    property.images = [...property?.images, ...images];
    await property.save();
    res
      .status(statusCodes.ACCEPTED)
      .send({ status: "success", data: property });
  } catch (error) {
    res
      .status(statusCodes.SERVER_ERROR)
      .send({ status: "error", message: error.message || "An error occured" });
  }
};

exports.deletePropertyImg = async (req, res) => {
  const { _id } = req.params;
  const imagesUrls = Object.keys(req.body)
  console.log(imagesUrls);
  if (!imagesUrls.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ status: "error", message: "No image provided" });
  }
  try {
    const property = await Property.findById(_id);
     if (!property) {
       return res
         .status(statusCodes.BAD_REQUEST)
         .send({ status: "error", message: "No property found" });
     }
     for (const url of imagesUrls) {
      console.log(req.body[url]);
       property.images = property.images.filter((img) => img !== req.body[url]);
     }
    await property.save();
    res.status(statusCodes.OK).send({ status: "success", data: property });
  } catch (error) {
    res
      .status(statusCodes.SERVER_ERROR)
      .send({ status: "error", message: error.message || "An error occured" });
  }
};
exports.updateProperty = async (req, res) => {
  const updates = Object.keys(req.body);
  const { _id } = req.params;
  const { error, value } = updateSchema.validate(req.body);
  if (error) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ status: "error", message: error.message });
  }
  try {
    const property = await Property.findById(_id);
     if (!property) {
       return res
         .status(statusCodes.NO_CONTENT)
         .send({ status: "error", message: "No property found" });
     }
    for (const update of updates) {
      property[update] = value[update];
    }
    await property.save();
    res
      .status(statusCodes.ACCEPTED)
      .send({ status: "success", data: property });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "An error occured. Try again",
    });
  }
};

exports.deleteProperty = async (req, res) => {
  const { _id } = req.params;
  try {
    const property = await Property.findByIdAndDelete({ _id });
    if (!property) {
      return res.status(statusCodes.BAD_REQUEST).send({
        status: "error",
        message: `Property with this id not found`,
      });
    }
    res.status(statusCodes.OK).send({
      status: "success",
      message: `Property was deleted successfully`,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(statusCodes.BAD_REQUEST).send({
        status: "error",
        message: `Property with this id not found`,
      });
    }
    res.status(statusCodes.SERVER_ERROR).send({
      status: "error",
      message: error.message || "An error occured. Try again",
    });
  }
};
