const mongoose = require("mongoose");
const validator = require("validator");

const propertySchema = new mongoose.Schema(
  {
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
      type: String,
      trim: true,
      required: true,
    },
    stockStatus: {
      type: String,
      default: "In Stock",
      validate(value) {
        if (value !== "In Stock" || value !== "Out of Stock") {
          throw new Error("Stock status should be In stock or Out of Stock");
        }
      },
    },
    images: [
      {
        image: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
