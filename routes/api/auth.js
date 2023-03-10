const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { registerSchema, loginSchema} = require("../../schema/userSchema");

router.post("/signup", validation(registerSchema), ctrlWrapper(ctrl.signUp));

router.post("/login", validation(loginSchema), ctrlWrapper(ctrl.logIn));

router.get("/logout", auth, ctrlWrapper(ctrl.logOut));

module.exports = router;