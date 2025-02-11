const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOne({ _id: id, owner: _id });

  if (!result) {
    throw createError(404, `Contact with id ${id} not found`);
  }

  res.status(200).json({
    status: "succes",
    code: 200,
    result,
  });
};

module.exports = getContactById;