const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, BCRYPT_SALT } = require("../utils/secrets");
const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Provide a valid email");
        }
      },
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      // minlength: 6,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Password cant be password");
        } else if (value.length < 6) {
          throw new Error("password length must be at least 6");
        }
      },
    },
    tokens: [
      {
        token: {
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

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();

  delete customerObject.password;
  delete customerObject.tokens;
  delete customerObject.avatar;

  return customerObject;
};

// This generate a new token for a customer
customerSchema.methods.generateAuthToken = async function () {
  const customer = this;
  const token = await jwt.sign({ _id: customer._id.toString() }, JWT_SECRET);
  customer.tokens = customer.tokens.concat({ token });
  customer.save();
  return token;
};

// Creating a custom method findByCredentials to find customer by their email and password
customerSchema.statics.findByCredentials = async (email, password) => {
  const customer = await Customer.findOne({ email });

  if (!customer) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return customer;
};

// hashing the customer plain text password
customerSchema.pre("save", async function (next) {
  const customer = this;
  if (customer.isModified("password")) {
    customer.password = await bcrypt.hash(customer.password, Number(BCRYPT_SALT));
  }
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
