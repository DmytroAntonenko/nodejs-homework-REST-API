const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};


module.exports = addContact;