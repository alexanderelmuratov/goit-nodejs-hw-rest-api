const createError = require('http-errors');

const contactsOperations = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;