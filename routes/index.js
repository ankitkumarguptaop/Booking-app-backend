const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");

router.use("/auth", require("./auth.routes"));
router.use(
  "/users",
  authMiddleware.jwtTokenValidation,
  require("./user.routes")
);


router.use(
  "/events",
  authMiddleware.jwtTokenValidation,
  require("./event.routes")
);

router.use(
  "/seats",
  authMiddleware.jwtTokenValidation,
  require("./seat.routes")
);

router.use(
  "/messages",
  authMiddleware.jwtTokenValidation,
  require("./message.routes")
);

module.exports = router;
