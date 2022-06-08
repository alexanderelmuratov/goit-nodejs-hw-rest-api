const createError = require('http-errors');

const contactsOperations = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactsOperations.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        updatedContact
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;