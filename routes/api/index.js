const express = require("express");

const cors = require("cors");

const router = express.Router();

const todoRoute = require("./todo");
const userRoute = require("./users");
router.use(cors());
router.use("/todo", todoRoute);
router.use("/users", userRoute);

module.exports = router;
