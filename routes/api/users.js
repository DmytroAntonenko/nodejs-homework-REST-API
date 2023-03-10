const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { subscriptionSchema } = require("../../schema/userSchema");


router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, validation(subscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;