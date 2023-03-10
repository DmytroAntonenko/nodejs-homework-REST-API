const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: _id },
    { favorite },
    { new: true }
  );
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }

  res.status(200).json({
    status: "succes",
    code: 200,
    result,
  });
};

module.exports = updateStatusContact;