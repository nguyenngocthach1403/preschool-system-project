const express = require("express");
const router = express.Router();

//function
const { loginUser } = require("../auth/auth.controller");

router.post("/", loginUser);

module.exports = router;
