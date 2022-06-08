const contactsOperations = require('../../models/contacts');

const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;