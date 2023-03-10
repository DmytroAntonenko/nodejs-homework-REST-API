const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const removeContact = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  const result = await Contact.findOneAndRemove({ _id: id, owner: _id });
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }

  res.status(201).json({
    status: "succes",
    massege: "Contact deleted",
    code: 201,
    dellatedContact: result,
  });
};

module.exports = removeContact;