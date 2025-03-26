const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");

router.use("/auth", require("./auth.routes"));
router.use(
  "/users",
  authMiddleware.jwtTokenValidation,
  require("./user.routes")
);




module.exports = router;
