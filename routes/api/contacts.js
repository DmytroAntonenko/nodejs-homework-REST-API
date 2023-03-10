const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { isValidId, auth, ctrlWrapper } = require("../../middlewares");

router.get("/",auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, ctrlWrapper(ctrl.addContact));

router.put("/:contactId", auth, isValidId, ctrlWrapper(ctrl.updateContact));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeContact));

router.patch('/:contactId/favorite', auth, isValidId, ctrlWrapper(ctrl.updateStatusContact));


module.exports = router;