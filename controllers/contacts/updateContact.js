const { Contact } = require("../../models/contact");
const contactSchema = require("../../schema/schema");
const createError = require("http-errors");

const updateContact  = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
          error.status = 400;
          throw error;
        }
    
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
          new: true,
        });
        if (!result) {
          throw createError(404, `Contact with id=${contactId} not found`);
        }
        res.json({
          status: "success",
          code: 201,
          data: {
            result,
          },
        });
      } catch (error) {
        next(error);
      }
};

module.exports = updateContact;