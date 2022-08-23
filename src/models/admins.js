const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, BCRYPT_SALT } = require("../utils/secrets");
const adminSchema = new mongoose.Schema(
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

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.tokens;
  delete adminObject.avatar;

  return adminObject;
};

// This generate a new token for an admin
adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = await jwt.sign({ _id: admin._id.toString() }, JWT_SECRET);
  admin.tokens = admin.tokens.concat({ token });
  admin.save();
  return token;
};

// Creating a custom method findByCredentials to find admin by their email and password
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return admin;
};

// hashing the admin plain text password
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, Number(BCRYPT_SALT));
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
