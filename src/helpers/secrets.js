require("dotenv/config");
const { BCRYPT_SALT, JWT_SECRET, MONGODB_URL } = process.env;

const credentials = ["BCRYPT_SALT", "JWT_SECRET", "MONGODB_URL"];

for (const credential of credentials) {
  if (process.env[credential] === undefined) {
    console.log(`Missing required credential ${credential}`);
    process.exit(1);
  }
}

module.exports = {
  BCRYPT_SALT,
  JWT_SECRET,
  MONGODB_URL,
};
