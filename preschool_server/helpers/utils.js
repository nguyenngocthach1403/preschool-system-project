const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const privateKEY = `MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAnSGROLyt8Fq+aXHF
MYABFEDdQ9amXGCjbTw29ERd9SWaTBGYM/8j85M0I0d2naEW1Wla1N6bdDVG72BG
sfLxPwIDAQABAkBbVrfkE0nI/fbRtKC8NXxrGYmFdbEe4c4eIXKQa21yoo/SaAXj
wtbytGVXHtlWbm1de4wJmjDgtfojermu282BAiEAzzcB4NIrM7Mr78UYmEztczDH
1mO/pL5e9D7ZcGlHrc0CIQDCH/m6GTHWTXG/76BnePf+vPpDW+XoqOOVEnFaQFpv
OwIgEBZVLv8iG4Fth8/leO2AAdFnsl1MI54kARJgDzodNoECIEYuIy1JYIAWXXJD
Yl0mGZoJnfxuI88aB7TkBwDW1RrzAiAIcBYU2AOBRN1FcZDBZsWWBIJtpmwcn1tr
4YNCkDWo0w`;
const publicKEY = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ0hkTi8rfBavmlxxTGAARRA3UPWplxg
o208NvREXfUlmkwRmDP/I/OTNCNHdp2hFtVpWtTem3Q1Ru9gRrHy8T8CAwEAAQ==`;

const i = "jwt-node";
const s = "jwt-node";
const a = "jwt-node";

const verifyOptions = {
  expiresIn: "48h",
};

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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
