const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const privateKEY = process.env.PRIVATE_KEY;
const publicKEY = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ0hkTi8rfBavmlxxTGAARRA3UPWplxg
o208NvREXfUlmkwRmDP/I/OTNCNHdp2hFtVpWtTem3Q1Ru9gRrHy8T8CAwEAAQ==`;

const verifyOptions = {
  expiresIn: "48h",
};

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

/**
 *
 * @param {object} payload
 * @returns string
 */
const generateJWT = (payload) => {
  const signOptions = {
    expiresIn: "48h",
  };

  const options = signOptions;
  if (payload && payload.exp) {
    delete options.expiresIn;
  }

  return jwt.sign(payload, privateKEY, options);
};

const verifyJWT = (payload) => {
  return jwt.verify(payload, privateKEY, verifyOptions);
};

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
  hashPassword,
  verifyJWT,
  generateJWT,
};
