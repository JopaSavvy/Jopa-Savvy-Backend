const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    stockStatus: {
      type: String,
      default: "in_stock",
      validate(value) {
        if (value !== "in_stock" && value !== "out_of_stock") {
          throw new Error("Stock status should be in_stock or out_of_stock");
        }
      },
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
