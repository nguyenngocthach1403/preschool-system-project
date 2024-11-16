const Response = require("../helpers/response");
const Utils = require("../helpers/utils");

const authenticate = () => {
  console.log("got here");
  return (req, res, next) => {
    try {
      let token = getTokenInRequest(req);
      console.log(token, "token");
      if (!token) throw new Error("No token provided.");
      if (token.startsWith("Bearer ")) token = token.slice(7, token.length);

      if (!token || token === "" || token === "undefined")
        throw new Error("No token provided.");

      const user = Utils.verifyJWT(token);

      console.log(`User verify token ${user}`);

      if (!user) throw new Error("Failed to authenticate token. ");

      res.user = user.data;
      delete user.data.password;
      res.token = token;
      return next();
    } catch (e) {
      return Response.sendErrorResponse({
        res,
        message: "Failed to authenticate token",
        statusCode: 401,
      });
    }
  };
};

function getTokenInRequest(req) {
  let token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.body.token;

  if (!token) return;

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    if (!token || token === "") return;

    return token;
  }
  return;
}

const decodeHeader = (req, res, next) => {
  let token = getTokenInRequest(req);
  console.log(token, "------------------");
  if (!token) {
    return Response.sendErrorResponse({
      res,
      message: "No token provided",
      statusCode: 401,
    });
  }

  const decoded = Utils.verifyJWT(token);
  if (!decoded)
    Response.sendErrorResponse({
      res,
      message: "invalid signature",
      statusCode: 403,
    });
  if (decoded) res.user = decoded;

  res.token = token;
  return next();
};

const isAdmin = (req, res, next) => {
  user = res.user;
  if (!user)
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      message: "Bạn không đủ quyền để thực hiện chức năng này!",
    });
  if (user.user_id != 1) {
    return Response.sendErrorResponse({
      res,
      statusCode: 400,
      message: "Bạn không đủ quyền để thực hiện chức năng này!",
    });
  }
  next();
};

module.exports = { authenticate, decodeHeader, isAdmin };
