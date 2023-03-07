const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const isValidId = require("../../middlewares/isValidId");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.patch('/:contactId/favorite', isValidId, ctrl.updateStatusContact);


module.exports = router;