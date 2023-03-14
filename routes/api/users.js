const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { validation, auth, ctrlWrapper, upLoad} = require("../../middlewares");
const { subscriptionSchema } = require("../../schema/userSchema");


router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, validation(subscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", auth, upLoad.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
  
module.exports = router;