const createError = require("http-errors");

const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    { new: true }
  ).populate("owner", "_id email subscription");

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
};

module.exports = updateContact;
