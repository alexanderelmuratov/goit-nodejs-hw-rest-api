const createError = require('http-errors');

const contactsOperations = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        removedContact
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;