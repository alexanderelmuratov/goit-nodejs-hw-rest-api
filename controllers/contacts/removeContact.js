const createError = require("http-errors");

const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  }).populate("owner", "_id email subscription");

  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
