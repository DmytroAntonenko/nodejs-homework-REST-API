const express = require('express')
const router = express.Router()
const createError = require("http-errors");
const {NotFound} = require('http-errors');

const contactsOperations = require('../../models/contacts')
const contactSchema = require("../../schema/schema");


router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    
    res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
    });
  } catch (error) {
    next(error);
  }
})


router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
  })

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = await req.params;
    const deletedContact = await contactsOperations.removeContact(contactId);
    
    if(!deletedContact){
      throw new NotFound('Not found');
    };
    
    res.json({
      status: 'success',
      code: 200,
      data: {
        deletedContact,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  };
})



router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateById(contactId, req.body);
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
})

module.exports = router